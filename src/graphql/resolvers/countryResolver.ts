import { Query, Resolver, Arg } from 'type-graphql';
import { Country, Currency } from '../schemas/Country';
import config from '../../config';
import axios from 'axios';
import { isNull } from 'lodash';

const API_PATHES = {
  COUNTRIES: 'https://restcountries.eu/rest/v2/name/',
  EXCHANGE_RATE: `http://data.fixer.io/api/latest?access_key=${config.fixerAPIKey}&base=SEK`,
};

@Resolver()
export class CountryResolver {
  private _countries: Country[] = [];
  @Query(_returns => [Country], { nullable: true })
  async getCountries(@Arg('name') name: string): Promise<Country[]> {
    try {
      /** Get countries & exchange rates */
      const countiesResponse = await axios.get(
        `${API_PATHES.COUNTRIES}${name}`,
      );
      const rateResponse = await axios.get(API_PATHES.EXCHANGE_RATE);
      const rates = rateResponse.data.rates;
      /** Adjust currency exchange rate */
      function getRateByCurrencyCode(code: string) {
        return rates[code] === undefined ? 0 : rates[code];
      }
      this._countries = countiesResponse.data
        .filter(
          (country: { currencies: Currency[] }) =>
            country.currencies.length > 0,
        )
        .map(
          (country: {
            name: string;
            population: number | null;
            currencies: Currency[];
          }) => ({
            name: country.name,
            population: country.population,
            currencies: country.currencies
              .filter(currency => !isNull(currency.code))
              .map(
                (currency: {
                  name: String | null;
                  code: String;
                  symbol: String | null;
                  exchangeRate: Number;
                }) => ({
                  name: currency.name,
                  code: currency.code,
                  symbol: currency.symbol,
                  exchangeRate: getRateByCurrencyCode(<string>currency.code),
                }),
              ),
          }),
        );
    } catch (error) {
      console.log('error', error);
    }
    return this._countries;
  }
}
