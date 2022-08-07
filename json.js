const jdoc = {
  tags: {
    '@cats': {
      name: '@cats',
      title: '/cats',
      interactionGroups: [
        {
          protocol: 'http',
          interactions: [
            'http GET /cats',
            'http POST /cats',
            'http GET /cats/{id}',
            'http PUT /cats/{id}',
            'http PATCH /cats/{id}',
            'http DELETE /cats/{id}',
            'http GET /cats/{id}/friends/{friendId}',
          ],
        },
      ],
    },
  },
  info: {
    title: 'Cats REST API',
    version: '1.0',
  },
  userTypes: {
    '@pet': {
      annotation: 'A pet.',
      schema: {
        content: {
          tokenType: 'object',
          type: 'object',
          children: [
            {
              key: 'id',
              tokenType: 'reference',
              type: '@petId',
              scalarValue: '@petId',
              optional: false,
            },
            {
              key: 'name',
              tokenType: 'string',
              type: 'string',
              scalarValue: 'Tom',
              optional: false,
            },
            {
              key: 'type',
              tokenType: 'string',
              type: 'enum',
              scalarValue: 'PIG',
              rules: [
                {
                  key: 'enum',
                  tokenType: 'array',
                  children: [
                    {
                      tokenType: 'string',
                      scalarValue: 'CAT',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'DOG',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'PIG',
                    },
                  ],
                },
              ],
              optional: false,
            },
            {
              key: 'age',
              tokenType: 'number',
              type: 'integer',
              scalarValue: '10',
              rules: [
                {
                  key: 'min',
                  tokenType: 'number',
                  scalarValue: '0',
                },
                {
                  key: 'max',
                  tokenType: 'number',
                  scalarValue: '99',
                },
              ],
              optional: false,
            },
            {
              key: 'email',
              tokenType: 'string',
              type: 'email',
              scalarValue: 'tom@pets.com',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'email',
                },
              ],
              optional: false,
            },
            {
              key: 'uri',
              tokenType: 'string',
              type: 'uri',
              scalarValue: 'http://tom.pets.com',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uri',
                },
              ],
              optional: false,
            },
            {
              key: 'birthday',
              tokenType: 'string',
              type: 'date',
              scalarValue: '2012-01-03',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'date',
                },
              ],
              optional: false,
            },
            {
              key: 'uuid',
              tokenType: 'string',
              type: 'uuid',
              scalarValue: '550e8400-e29b-41d4-a716-446655440000',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uuid',
                },
              ],
              optional: false,
            },
          ],
          optional: false,
        },
        notation: 'jsight',
        usedUserTypes: ['@petId'],
      },
    },
    '@cat': {
      annotation: 'A cat.',
      schema: {
        content: {
          rules: [
            {
              key: 'allOf',
              tokenType: 'string',
              scalarValue: '@pet',
            },
          ],
          tokenType: 'object',
          type: 'object',
          children: [
            {
              key: 'id',
              tokenType: 'reference',
              type: '@petId',
              scalarValue: '@petId',
              inheritedFrom: '@pet',
              optional: false,
            },
            {
              key: 'name',
              tokenType: 'string',
              type: 'string',
              scalarValue: 'Tom',
              inheritedFrom: '@pet',
              optional: false,
            },
            {
              key: 'type',
              tokenType: 'string',
              type: 'enum',
              scalarValue: 'PIG',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'enum',
                  tokenType: 'array',
                  children: [
                    {
                      tokenType: 'string',
                      scalarValue: 'CAT',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'DOG',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'PIG',
                    },
                  ],
                },
              ],
              optional: false,
            },
            {
              key: 'age',
              tokenType: 'number',
              type: 'integer',
              scalarValue: '10',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'min',
                  tokenType: 'number',
                  scalarValue: '0',
                },
                {
                  key: 'max',
                  tokenType: 'number',
                  scalarValue: '99',
                },
              ],
              optional: false,
            },
            {
              key: 'email',
              tokenType: 'string',
              type: 'email',
              scalarValue: 'tom@pets.com',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'email',
                },
              ],
              optional: false,
            },
            {
              key: 'uri',
              tokenType: 'string',
              type: 'uri',
              scalarValue: 'http://tom.pets.com',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uri',
                },
              ],
              optional: false,
            },
            {
              key: 'birthday',
              tokenType: 'string',
              type: 'date',
              scalarValue: '2012-01-03',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'date',
                },
              ],
              optional: false,
            },
            {
              key: 'uuid',
              tokenType: 'string',
              type: 'uuid',
              scalarValue: '550e8400-e29b-41d4-a716-446655440000',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uuid',
                },
              ],
              optional: false,
            },
            {
              key: 'status',
              tokenType: 'string',
              type: 'string',
              scalarValue: 'relaxing',
              optional: false,
            },
            {
              key: 'bestFriend',
              tokenType: 'reference',
              type: '@cat',
              scalarValue: '@cat',
              optional: false,
            },
            {
              rules: [
                {
                  key: 'additionalProperties',
                  tokenType: 'boolean',
                  scalarValue: 'true',
                },
              ],
              key: 'topFriends',
              tokenType: 'object',
              type: 'object',
              children: [
                {
                  key: '@petName',
                  tokenType: 'reference',
                  type: 'mixed',
                  scalarValue: '@cat | @pig',
                  isKeyUserTypeRef: true,
                  optional: false,
                },
              ],
              optional: false,
            },
            {
              rules: [
                {
                  key: 'maxItems',
                  tokenType: 'number',
                  scalarValue: '10',
                },
              ],
              key: 'topEnemies',
              tokenType: 'array',
              type: 'array',
              children: [
                {
                  tokenType: 'reference',
                  type: '@dog',
                  scalarValue: '@dog',
                  optional: true,
                },
              ],
              optional: false,
            },
          ],
          optional: false,
        },
        notation: 'jsight',
        usedUserTypes: ['@pet', '@cat', '@pig', '@petName', '@dog'],
      },
    },
    '@dog': {
      annotation: 'A dog.',
      schema: {
        content: {
          rules: [
            {
              key: 'allOf',
              tokenType: 'string',
              scalarValue: '@pet',
            },
          ],
          tokenType: 'object',
          type: 'object',
          children: [
            {
              key: 'id',
              tokenType: 'reference',
              type: '@petId',
              scalarValue: '@petId',
              inheritedFrom: '@pet',
              optional: false,
            },
            {
              key: 'name',
              tokenType: 'string',
              type: 'string',
              scalarValue: 'Tom',
              inheritedFrom: '@pet',
              optional: false,
            },
            {
              key: 'type',
              tokenType: 'string',
              type: 'enum',
              scalarValue: 'PIG',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'enum',
                  tokenType: 'array',
                  children: [
                    {
                      tokenType: 'string',
                      scalarValue: 'CAT',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'DOG',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'PIG',
                    },
                  ],
                },
              ],
              optional: false,
            },
            {
              key: 'age',
              tokenType: 'number',
              type: 'integer',
              scalarValue: '10',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'min',
                  tokenType: 'number',
                  scalarValue: '0',
                },
                {
                  key: 'max',
                  tokenType: 'number',
                  scalarValue: '99',
                },
              ],
              optional: false,
            },
            {
              key: 'email',
              tokenType: 'string',
              type: 'email',
              scalarValue: 'tom@pets.com',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'email',
                },
              ],
              optional: false,
            },
            {
              key: 'uri',
              tokenType: 'string',
              type: 'uri',
              scalarValue: 'http://tom.pets.com',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uri',
                },
              ],
              optional: false,
            },
            {
              key: 'birthday',
              tokenType: 'string',
              type: 'date',
              scalarValue: '2012-01-03',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'date',
                },
              ],
              optional: false,
            },
            {
              key: 'uuid',
              tokenType: 'string',
              type: 'uuid',
              scalarValue: '550e8400-e29b-41d4-a716-446655440000',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uuid',
                },
              ],
              optional: false,
            },
            {
              key: 'friendIds',
              tokenType: 'array',
              type: 'array',
              note: 'Only dog ids are allowed.',
              children: [
                {
                  tokenType: 'reference',
                  type: '@petId',
                  scalarValue: '@petId',
                  optional: true,
                },
              ],
              optional: false,
            },
            {
              key: 'isDangerous',
              tokenType: 'boolean',
              type: 'boolean',
              scalarValue: 'false',
              optional: false,
            },
            {
              key: 'legacyId',
              tokenType: 'number',
              type: 'mixed',
              scalarValue: '1',
              rules: [
                {
                  key: 'or',
                  tokenType: 'array',
                  children: [
                    {
                      tokenType: 'object',
                      children: [
                        {
                          key: 'type',
                          tokenType: 'string',
                          scalarValue: 'integer',
                        },
                        {
                          key: 'min',
                          tokenType: 'number',
                          scalarValue: '0',
                        },
                        {
                          key: 'exclusiveMinimum',
                          tokenType: 'boolean',
                          scalarValue: 'true',
                        },
                      ],
                    },
                    {
                      tokenType: 'object',
                      children: [
                        {
                          key: 'type',
                          tokenType: 'string',
                          scalarValue: 'string',
                        },
                      ],
                    },
                  ],
                },
                {
                  key: 'optional',
                  tokenType: 'boolean',
                  scalarValue: 'true',
                },
              ],
              optional: true,
            },
            {
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'any',
                },
              ],
              key: 'additionalData',
              tokenType: 'object',
              type: 'any',
              note: 'Field for legacy.',
              children: [],
              optional: false,
            },
          ],
          optional: false,
        },
        notation: 'jsight',
        usedUserTypes: ['@pet', '@petId'],
      },
    },
    '@pig': {
      annotation: 'A pig.',
      schema: {
        content: {
          rules: [
            {
              key: 'allOf',
              tokenType: 'string',
              scalarValue: '@pet',
            },
          ],
          tokenType: 'object',
          type: 'object',
          children: [
            {
              key: 'id',
              tokenType: 'reference',
              type: '@petId',
              scalarValue: '@petId',
              inheritedFrom: '@pet',
              optional: false,
            },
            {
              key: 'name',
              tokenType: 'string',
              type: 'string',
              scalarValue: 'Tom',
              inheritedFrom: '@pet',
              optional: false,
            },
            {
              key: 'type',
              tokenType: 'string',
              type: 'enum',
              scalarValue: 'PIG',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'enum',
                  tokenType: 'array',
                  children: [
                    {
                      tokenType: 'string',
                      scalarValue: 'CAT',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'DOG',
                    },
                    {
                      tokenType: 'string',
                      scalarValue: 'PIG',
                    },
                  ],
                },
              ],
              optional: false,
            },
            {
              key: 'age',
              tokenType: 'number',
              type: 'integer',
              scalarValue: '10',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'min',
                  tokenType: 'number',
                  scalarValue: '0',
                },
                {
                  key: 'max',
                  tokenType: 'number',
                  scalarValue: '99',
                },
              ],
              optional: false,
            },
            {
              key: 'email',
              tokenType: 'string',
              type: 'email',
              scalarValue: 'tom@pets.com',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'email',
                },
              ],
              optional: false,
            },
            {
              key: 'uri',
              tokenType: 'string',
              type: 'uri',
              scalarValue: 'http://tom.pets.com',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uri',
                },
              ],
              optional: false,
            },
            {
              key: 'birthday',
              tokenType: 'string',
              type: 'date',
              scalarValue: '2012-01-03',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'date',
                },
              ],
              optional: false,
            },
            {
              key: 'uuid',
              tokenType: 'string',
              type: 'uuid',
              scalarValue: '550e8400-e29b-41d4-a716-446655440000',
              inheritedFrom: '@pet',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'uuid',
                },
              ],
              optional: false,
            },
            {
              key: 'temperature',
              tokenType: 'number',
              type: 'decimal',
              scalarValue: '35.6',
              rules: [
                {
                  key: 'precision',
                  tokenType: 'number',
                  scalarValue: '1',
                },
                {
                  key: 'nullable',
                  tokenType: 'boolean',
                  scalarValue: 'true',
                },
              ],
              optional: false,
            },
            {
              key: 'pigSize',
              tokenType: 'string',
              type: '@pigSize',
              scalarValue: 'S',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: '@pigSize',
                },
              ],
              optional: false,
            },
            {
              key: 'lastWashTime',
              tokenType: 'string',
              type: 'datetime',
              scalarValue: '2021-01-02T15:04:05+03:00',
              rules: [
                {
                  key: 'type',
                  tokenType: 'string',
                  scalarValue: 'datetime',
                },
              ],
              optional: false,
            },
            {
              rules: [
                {
                  key: 'additionalProperties',
                  tokenType: 'string',
                  scalarValue: 'string',
                },
              ],
              key: 'additionalData',
              tokenType: 'object',
              type: 'object',
              children: [
                {
                  key: 'key',
                  tokenType: 'string',
                  type: 'string',
                  scalarValue: 'value',
                  optional: false,
                },
              ],
              optional: false,
            },
          ],
          optional: false,
        },
        notation: 'jsight',
        usedUserTypes: ['@pet', '@pigSize'],
      },
    },
    '@pigSize': {
      schema: {
        content: {
          tokenType: 'string',
          type: 'enum',
          scalarValue: 'S',
          rules: [
            {
              key: 'enum',
              tokenType: 'array',
              children: [
                {
                  tokenType: 'string',
                  scalarValue: 'XXS',
                },
                {
                  tokenType: 'string',
                  scalarValue: 'XS',
                },
                {
                  tokenType: 'string',
                  scalarValue: 'S',
                },
                {
                  tokenType: 'string',
                  scalarValue: 'M',
                },
                {
                  tokenType: 'string',
                  scalarValue: 'L',
                },
                {
                  tokenType: 'string',
                  scalarValue: 'XL',
                },
                {
                  tokenType: 'string',
                  scalarValue: 'XXL',
                },
              ],
            },
          ],
          optional: false,
        },
        notation: 'jsight',
      },
    },
    '@petId': {
      schema: {
        content: {
          tokenType: 'string',
          type: 'string',
          scalarValue: 'GOAT-12345',
          rules: [
            {
              key: 'regex',
              tokenType: 'string',
              scalarValue: '^[A-Z]+-\\d+$',
            },
            {
              key: 'minLength',
              tokenType: 'number',
              scalarValue: '3',
            },
            {
              key: 'maxLength',
              tokenType: 'number',
              scalarValue: '255',
            },
          ],
          optional: false,
        },
        notation: 'jsight',
      },
    },
    '@petName': {
      schema: {
        content: '^[A-Z][a-z]*( [A-Z][a-z]*)*$',
        notation: 'regex',
      },
    },
    '@error': {
      annotation: 'A common error response.',
      schema: {
        content: {
          tokenType: 'object',
          type: 'object',
          children: [
            {
              key: 'code',
              tokenType: 'number',
              type: 'integer',
              scalarValue: '12',
              optional: false,
            },
            {
              key: 'message',
              tokenType: 'string',
              type: 'string',
              scalarValue: 'Something bad had happened on the server...',
              optional: false,
            },
          ],
          optional: false,
        },
        notation: 'jsight',
      },
    },
  },
  interactions: {
    'http GET /cats': {
      id: 'http GET /cats',
      protocol: 'http',
      httpMethod: 'GET',
      path: '/cats',
      tags: ['@cats'],
      annotation: 'Get all cats.',
      responses: [
        {
          code: '200',
          annotation: 'Returns all cats.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'object',
                type: 'object',
                children: [
                  {
                    key: 'items',
                    tokenType: 'array',
                    type: 'array',
                    children: [
                      {
                        tokenType: 'reference',
                        type: '@cat',
                        scalarValue: '@cat',
                        optional: true,
                      },
                    ],
                    optional: false,
                  },
                  {
                    key: 'itemsCount',
                    tokenType: 'number',
                    type: 'integer',
                    scalarValue: '25',
                    rules: [
                      {
                        key: 'min',
                        tokenType: 'number',
                        scalarValue: '0',
                      },
                    ],
                    optional: false,
                  },
                ],
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@cat'],
            },
          },
        },
      ],
    },
    'http POST /cats': {
      id: 'http POST /cats',
      protocol: 'http',
      httpMethod: 'POST',
      path: '/cats',
      tags: ['@cats'],
      annotation: 'Create a cat.',
      request: {
        body: {
          format: 'json',
          schema: {
            content: {
              tokenType: 'reference',
              type: '@cat',
              scalarValue: '@cat',
              optional: false,
            },
            notation: 'jsight',
            usedUserTypes: ['@cat'],
          },
        },
      },
      responses: [
        {
          code: '200',
          annotation: 'Success.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'reference',
                type: '@cat',
                scalarValue: '@cat',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@cat'],
            },
          },
        },
        {
          code: '409',
          annotation: 'Error.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'reference',
                type: '@error',
                scalarValue: '@error',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@error'],
            },
          },
        },
      ],
    },
    'http GET /cats/{id}': {
      id: 'http GET /cats/{id}',
      protocol: 'http',
      httpMethod: 'GET',
      path: '/cats/{id}',
      pathVariables: {
        schema: {
          content: {
            tokenType: 'object',
            type: 'object',
            children: [
              {
                note: 'Cat’s id.',
                key: 'id',
                tokenType: 'string',
                type: '@petId',
                scalarValue: 'CAT-123',
                rules: [
                  {
                    key: 'type',
                    tokenType: 'string',
                    scalarValue: '@petId',
                  },
                ],
                optional: false,
              },
            ],
            optional: false,
          },
          notation: 'jsight',
          usedUserTypes: ['@petId'],
        },
      },
      tags: ['@cats'],
      annotation: 'Get a cat by its id.',
      responses: [
        {
          code: '200',
          annotation: 'Returns a cat.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'reference',
                type: '@cat',
                scalarValue: '@cat',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@cat'],
            },
          },
        },
        {
          code: '404',
          annotation: 'Cat not found.',
          body: {
            format: 'binary',
            schema: {
              notation: 'empty',
            },
          },
        },
      ],
    },
    'http PUT /cats/{id}': {
      id: 'http PUT /cats/{id}',
      protocol: 'http',
      httpMethod: 'PUT',
      path: '/cats/{id}',
      pathVariables: {
        schema: {
          content: {
            tokenType: 'object',
            type: 'object',
            children: [
              {
                note: 'Cat’s id.',
                key: 'id',
                tokenType: 'string',
                type: '@petId',
                scalarValue: 'CAT-123',
                rules: [
                  {
                    key: 'type',
                    tokenType: 'string',
                    scalarValue: '@petId',
                  },
                ],
                optional: false,
              },
            ],
            optional: false,
          },
          notation: 'jsight',
          usedUserTypes: ['@petId'],
        },
      },
      tags: ['@cats'],
      annotation: 'Update a cat.',
      request: {
        body: {
          format: 'json',
          schema: {
            content: {
              tokenType: 'reference',
              type: '@cat',
              scalarValue: '@cat',
              optional: false,
            },
            notation: 'jsight',
            usedUserTypes: ['@cat'],
          },
        },
      },
      responses: [
        {
          code: '200',
          annotation: 'Returns an updated cat.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'reference',
                type: '@cat',
                scalarValue: '@cat',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@cat'],
            },
          },
        },
        {
          code: '404',
          annotation: 'A cat is not found.',
          body: {
            format: 'binary',
            schema: {
              notation: 'empty',
            },
          },
        },
        {
          code: '409',
          annotation: 'Some error.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'reference',
                type: '@error',
                scalarValue: '@error',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@error'],
            },
          },
        },
      ],
    },
    'http PATCH /cats/{id}': {
      id: 'http PATCH /cats/{id}',
      protocol: 'http',
      httpMethod: 'PATCH',
      path: '/cats/{id}',
      pathVariables: {
        schema: {
          content: {
            tokenType: 'object',
            type: 'object',
            children: [
              {
                note: 'Cat’s id.',
                key: 'id',
                tokenType: 'string',
                type: '@petId',
                scalarValue: 'CAT-123',
                rules: [
                  {
                    key: 'type',
                    tokenType: 'string',
                    scalarValue: '@petId',
                  },
                ],
                optional: false,
              },
            ],
            optional: false,
          },
          notation: 'jsight',
          usedUserTypes: ['@petId'],
        },
      },
      tags: ['@cats'],
      annotation: 'Update a cat’s status.',
      request: {
        body: {
          format: 'json',
          schema: {
            content: {
              tokenType: 'object',
              type: 'object',
              children: [
                {
                  note: 'New status of the cat.',
                  key: 'status',
                  tokenType: 'string',
                  type: 'string',
                  scalarValue: 'relaxing',
                  optional: false,
                },
              ],
              optional: false,
            },
            notation: 'jsight',
          },
        },
      },
      responses: [
        {
          code: '200',
          annotation: 'Ok.',
          body: {
            format: 'binary',
            schema: {
              notation: 'any',
            },
          },
        },
        {
          code: '409',
          annotation: 'Some error.',
          body: {
            format: 'json',
            schema: {
              content: {
                tokenType: 'reference',
                type: '@error',
                scalarValue: '@error',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@error'],
            },
          },
        },
        {
          code: '404',
          annotation: 'A cat is not found.',
          body: {
            format: 'binary',
            schema: {
              notation: 'empty',
            },
          },
        },
      ],
    },
    'http DELETE /cats/{id}': {
      id: 'http DELETE /cats/{id}',
      protocol: 'http',
      httpMethod: 'DELETE',
      path: '/cats/{id}',
      pathVariables: {
        schema: {
          content: {
            tokenType: 'object',
            type: 'object',
            children: [
              {
                note: 'Cat’s id.',
                key: 'id',
                tokenType: 'string',
                type: '@petId',
                scalarValue: 'CAT-123',
                rules: [
                  {
                    key: 'type',
                    tokenType: 'string',
                    scalarValue: '@petId',
                  },
                ],
                optional: false,
              },
            ],
            optional: false,
          },
          notation: 'jsight',
          usedUserTypes: ['@petId'],
        },
      },
      tags: ['@cats'],
      annotation: 'Delete a cat.',
    },
    'http GET /cats/{id}/friends/{friendId}': {
      id: 'http GET /cats/{id}/friends/{friendId}',
      protocol: 'http',
      httpMethod: 'GET',
      path: '/cats/{id}/friends/{friendId}',
      pathVariables: {
        schema: {
          content: {
            tokenType: 'object',
            type: 'object',
            children: [
              {
                note: 'Cat’s id.',
                key: 'id',
                tokenType: 'string',
                type: '@petId',
                scalarValue: 'CAT-123',
                rules: [
                  {
                    key: 'type',
                    tokenType: 'string',
                    scalarValue: '@petId',
                  },
                ],
                optional: false,
              },
              {
                note: 'Friend’s id.',
                key: 'friendId',
                tokenType: 'reference',
                type: '@petId',
                scalarValue: '@petId',
                optional: false,
              },
            ],
            optional: false,
          },
          notation: 'jsight',
          usedUserTypes: ['@petId'],
        },
      },
      tags: ['@cats'],
      annotation: 'Get a cat’s friend.',
      responses: [
        {
          code: '200',
          annotation: 'Returns the cat’s friend.',
          body: {
            format: 'json',
            schema: {
              content: {
                note: 'The cat’s friend (cat or pig).',
                tokenType: 'reference',
                type: 'mixed',
                scalarValue: '@cat | @pig',
                optional: false,
              },
              notation: 'jsight',
              usedUserTypes: ['@cat', '@pig'],
            },
          },
        },
      ],
    },
  },
  jsight: '0.3',
  jdocExchangeVersion: '2.0.0',
};
