import { Model, Modifiers } from 'objection'


export class User extends Model {
  id!: string
  firstName!: string
  lastName!: string
  age!: number


  // Table name is the only required property.
  static tableName = 'users'

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName'],

    properties: {
      id: { type: 'uuid' },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      age: { type: 'number' },

      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          zipCode: { type: 'string' },
        },
      },
    },
  }

  // Modifiers are reusable query snippets that can be used in various places.
  static modifiers: Modifiers = {
    searchByName(query, name) {
      // This `where` simply creates parentheses so that other `where`
      // statements don't get mixed with the these.
      query.where((query) => {
        for (const namePart of name.trim().split(/\s+/)) {
          for (const column of ['firstName', 'lastName']) {
            query.orWhereRaw('lower(??) like ?', [column, namePart.toLowerCase() + '%'])
          }
        }
      })
    },
  }

  static relationMappings = () => ({

  })
}
