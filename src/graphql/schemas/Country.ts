import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The Country model' })
export class Country {
  @Field()
  name!: String;

  @Field({ nullable: true })
  population!: Number;

  @Field(type => [Currency])
  currencies!: Currency[];
}

@ObjectType({ description: 'The Currency model' })
export class Currency {
  @Field()
  code!: String;

  @Field({ nullable: true })
  name!: String;

  @Field({ nullable: true })
  symbol!: String;

  @Field()
  exchangeRate!: Number;
}
