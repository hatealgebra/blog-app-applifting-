export interface Paths {
  '/login': {
    post: {
      responses: {
        /** Access token detail */
        201: {
          content: {
            'application/json': Components['schemas']['AccessToken'];
          };
        };
        /** Invalid login credentials */
        400: {
          content: {
            'application/json': unknown;
          };
        };
        401: Components['responses']['ApiKeyInvalidError'];
      };
      requestBody: {
        content: {
          'application/json': {
            username?: string;
            /** Format: password */
            password: string;
          };
        };
      };
    };
  };
  '/articles': {
    get: Operations['listArticles'];
    post: Operations['createArticle'];
  };
  '/articles/{articleId}': {
    get: Operations['getArticle'];
    delete: Operations['deleteArticle'];
    patch: Operations['updateArticle'];
  };
  '/comments': {
    post: {
      responses: {
        /** Detail of the created comment */
        201: {
          content: {
            'application/json': Components['schemas']['Comment'];
          };
        };
        401: Components['responses']['ApiKeyInvalidError'];
      };
      requestBody: {
        content: {
          'application/json': Components['schemas']['Comment'];
        };
      };
    };
  };
  '/comments/{commentId}/vote/up': {
    post: {
      parameters: {
        path: {
          /** Id of an comment */
          commentId: Components['parameters']['commentId'];
        };
      };
      responses: {
        /** Updated comment detail */
        201: {
          content: {
            'application/json': Components['schemas']['Comment'];
          };
        };
        401: Components['responses']['ApiKeyInvalidError'];
      };
    };
  };
  '/comments/{commentId}/vote/down': {
    post: {
      parameters: {
        path: {
          /** Id of an comment */
          commentId: Components['parameters']['commentId'];
        };
      };
      responses: {
        /** Updated comment detail */
        201: {
          content: {
            'application/json': Components['schemas']['Comment'];
          };
        };
        401: Components['responses']['ApiKeyInvalidError'];
      };
    };
  };
  '/images': {
    post: {
      responses: {
        /** Image uploaded successfully */
        201: {
          content: {
            'application/json': Components['schemas']['ImageInfo'][];
          };
        };
        401: Components['responses']['ApiKeyInvalidError'];
      };
      requestBody: {
        content: {
          'multipart/form-data': {
            image?: string[];
          };
        };
      };
    };
  };
  '/images/{imageId}': {
    get: {
      parameters: {
        path: {
          /** Id of the image to retrieve */
          imageId: Components['parameters']['imageId'];
        };
      };
      responses: {
        /** Image file */
        200: unknown;
        401: Components['responses']['ApiKeyInvalidError'];
      };
    };
    delete: {
      parameters: {
        path: {
          /** Id of the image to retrieve */
          imageId: Components['parameters']['imageId'];
        };
      };
      responses: {
        /** Image no longer exists */
        204: never;
        401: Components['responses']['ApiKeyInvalidError'];
      };
    };
  };
  '/tenants': {
    post: {
      responses: {
        /** Detail of the created tenant */
        201: {
          content: {
            'application/json': Components['schemas']['Tenant'];
          };
        };
      };
      requestBody: {
        content: {
          'application/json': Components['schemas']['Tenant'];
        };
      };
    };
  };
  '/tenants/{tenantId}': {
    get: {
      parameters: {
        path: {
          /** Id of the tenant to retrieve */
          tenantId: Components['parameters']['tenantId'];
        };
      };
      responses: {
        /** Tenant detail */
        200: {
          content: {
            'application/json': Components['schemas']['Tenant'];
          };
        };
      };
    };
  };
}

export interface Components {
  schemas: {
    Pagination: {
      /** @description Number of items skipped during pagination */
      offset?: number;
      /** @description Number of items returned */
      limit?: number;
      /** @description Total number of items */
      total?: number;
    };
    ArticleList: {
      pagination?: Components['schemas']['Pagination'];
      items?: Components['schemas']['Article'][];
    };
    Article: {
      /** Format: uuid */
      articleId?: string;
      /** @example Lorem Ipsum */
      title?: string;
      /** @example Lorem Ipsum is simply dummy text of the printing and typesetting industry. */
      perex?: string;
      /** Format: uuid */
      imageId?: string;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      lastUpdatedAt?: string;
    };
    ArticleDetail: Components['schemas']['Article'] & {
      /**
       * Format: markdown
       * @example # Lorem Ipsum
       * **Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
       */
      content?: string;
      comments?: Components['schemas']['Comment'][];
    };
    Comment: {
      /** Format: uuid */
      commentId?: string;
      /** Format: uuid */
      articleId: string;
      /** @example Jan Novak */
      author: string;
      /** @example This article is on point and very inspirational. */
      content: string;
      /** Format: date-time */
      postedAt?: string;
      /** @example 42 */
      score?: number;
    };
    ImageInfo: {
      /** Format: uuid */
      imageId: string;
      /** @example screenshot.png */
      name?: string;
    };
    Tenant: {
      /** Format: uuid */
      tenantId?: string;
      /**
       * Format: uuid
       * @description API key to be used in the `api-key` header
       */
      apiKey?: string;
      /**
       * @description Human readable name of the tenant
       * @example Jan Novak
       */
      name?: string;
      /**
       * Format: password
       * @description Authentication password of the tenant
       * @example correct horse battery staple
       */
      password?: string;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      lastUsedAt?: string;
    };
    AccessToken: {
      /**
       * Format: uuid
       * @description Use this when requesting authenticated API endpoints
       */
      access_token?: string;
      /**
       * @description Number of seconds before the access_token expires
       * @example 3600
       */
      expires_in?: number;
      /**
       * @description Token type. Will always be bearer
       * @example bearer
       */
      token_type?: string;
    };
  };
  responses: {
    /** API key is missing or invalid */
    ApiKeyInvalidError: {
      content: {
        'application/json': unknown;
      };
    };
    /** Access token is missing or invalid */
    UnauthorizedError: {
      content: {
        'application/json': unknown;
      };
    };
  };
  parameters: {
    /** @description Id of the tenant to retrieve */
    tenantId: string;
    /** @description Id of the image to retrieve */
    imageId: string;
    /** @description Id of an article */
    articleId: string;
    /** @description Id of an comment */
    commentId: string;
    /** @description Number of items to skip during pagination */
    offset: number;
    /** @description Number of items to return per page. All items are returned if `limit` is omitted. */
    limit: number;
  };
}

export interface Operations {
  listArticles: {
    parameters: {
      query: {
        /** Number of items to skip during pagination */
        offset?: Components['parameters']['offset'];
        /** Number of items to return per page. All items are returned if `limit` is omitted. */
        limit?: Components['parameters']['limit'];
      };
    };
    responses: {
      /** Article list */
      200: {
        content: {
          'application/json': Components['schemas']['Article'][];
        };
      };
      401: Components['responses']['ApiKeyInvalidError'];
    };
  };
  createArticle: {
    responses: {
      /** Detail of the created article */
      200: {
        content: {
          'application/json': Components['schemas']['ArticleDetail'];
        };
      };
      401: Components['responses']['ApiKeyInvalidError'];
      403: Components['responses']['UnauthorizedError'];
    };
    requestBody: {
      content: {
        'application/json': Components['schemas']['ArticleDetail'];
      };
    };
  };
  getArticle: {
    parameters: {
      path: {
        /** Id of an article */
        articleId: Components['parameters']['articleId'];
      };
    };
    responses: {
      /** Article detail */
      200: {
        content: {
          'application/json': Components['schemas']['ArticleDetail'];
        };
      };
      401: Components['responses']['ApiKeyInvalidError'];
    };
  };
  deleteArticle: {
    parameters: {
      path: {
        /** Id of an article */
        articleId: Components['parameters']['articleId'];
      };
    };
    responses: {
      /** Article no longer exists */
      204: never;
      401: Components['responses']['ApiKeyInvalidError'];
      403: Components['responses']['UnauthorizedError'];
    };
  };
  updateArticle: {
    parameters: {
      path: {
        /** Id of an article */
        articleId: Components['parameters']['articleId'];
      };
    };
    responses: {
      /** Updated article detail */
      200: {
        content: {
          'application/json': Components['schemas']['ArticleDetail'];
        };
      };
      401: Components['responses']['ApiKeyInvalidError'];
      403: Components['responses']['UnauthorizedError'];
    };
    requestBody: {
      content: {
        'application/json': Components['schemas']['ArticleDetail'];
      };
    };
  };
}

export interface External {}
