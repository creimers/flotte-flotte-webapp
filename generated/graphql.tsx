import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /**
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type BikeNode = Node & {
  __typename?: 'BikeNode';
  bookings: BookingNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  pickupStation?: Maybe<PickupStationNode>;
  purchaseDate: Scalars['Date'];
};


export type BikeNodeBookingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type BikeNodeConnection = {
  __typename?: 'BikeNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BikeNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `BikeNode` and its cursor. */
export type BikeNodeEdge = {
  __typename?: 'BikeNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<BikeNode>;
};

export type BookingNode = Node & {
  __typename?: 'BookingNode';
  bike: BikeNode;
  /** The ID of the object. */
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  pickupKilometers?: Maybe<Scalars['Int']>;
  pickupTimestamp?: Maybe<Scalars['Time']>;
  returnTimestamp?: Maybe<Scalars['Time']>;
  startDate: Scalars['Date'];
  state: BookingState;
  token?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

export type BookingNodeConnection = {
  __typename?: 'BookingNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BookingNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `BookingNode` and its cursor. */
export type BookingNodeEdge = {
  __typename?: 'BookingNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<BookingNode>;
};

/** An enumeration. */
export enum BookingState {
  /** Storniert */
  Canceled = 'CANCELED',
  /** Bestätigt */
  Confirmed = 'CONFIRMED',
  /** Abgelehnt */
  Rejected = 'REJECTED',
  /** Angefragt */
  Requested = 'REQUESTED'
}

export type CreateBookingInput = {
  pickupTimestamp: Scalars['Time'];
  startDate: Scalars['Date'];
};

export type CreateBookingMutation = {
  __typename?: 'CreateBookingMutation';
  booking?: Maybe<BookingNode>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking?: Maybe<CreateBookingMutation>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /**
   * Register user with fields defined in the settings.
   *
   * If the email field of the user model is part of the
   * registration fields (default), check if there is
   * no user with that email or as a secondary email.
   *
   * If it exists, it does not register the user,
   * even if the email field is not defined as unique
   * (default of the default django user model).
   *
   * When creating the user, it also creates a `UserStatus`
   * related to that user, making it possible to track
   * if the user is archived, verified and has a secondary
   * email.
   *
   * Send account verification email.
   *
   * If allowed to not verified users login, return token.
   */
  register?: Maybe<Register>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  verifyToken?: Maybe<VerifyToken>;
};


export type MutationCreateBookingArgs = {
  input?: Maybe<CreateBookingInput>;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserNode>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PickupStationNode = Node & {
  __typename?: 'PickupStationNode';
  bikes: BikeNodeConnection;
  contactName?: Maybe<Scalars['String']>;
  contactTelephone?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  locationCity?: Maybe<Scalars['String']>;
  locationPostalcode?: Maybe<Scalars['String']>;
  locationStreet?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type PickupStationNodeBikesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  bikes?: Maybe<BikeNodeConnection>;
  bookedDates?: Maybe<Array<Maybe<Scalars['Date']>>>;
  booking?: Maybe<BookingNode>;
  bookings?: Maybe<BookingNodeConnection>;
  me?: Maybe<UserNode>;
};


export type QueryBikesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryBookedDatesArgs = {
  bikeId: Scalars['Int'];
};


export type QueryBookingArgs = {
  uuid: Scalars['String'];
};


export type QueryBookingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Register user with fields defined in the settings.
 *
 * If the email field of the user model is part of the
 * registration fields (default), check if there is
 * no user with that email or as a secondary email.
 *
 * If it exists, it does not register the user,
 * even if the email field is not defined as unique
 * (default of the default django user model).
 *
 * When creating the user, it also creates a `UserStatus`
 * related to that user, making it possible to track
 * if the user is archived, verified and has a secondary
 * email.
 *
 * Send account verification email.
 *
 * If allowed to not verified users login, return token.
 */
export type Register = {
  __typename?: 'Register';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RevokeToken = {
  __typename?: 'RevokeToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  revoked?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  archived?: Maybe<Scalars['Boolean']>;
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Legt fest, ob dieser Benutzer aktiv ist. Kann deaktiviert werden, anstatt Benutzer zu löschen. */
  isActive: Scalars['Boolean'];
  /** Legt fest, ob sich der Benutzer an der Administrationsseite anmelden kann. */
  isStaff: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  pk?: Maybe<Scalars['Int']>;
  rentals: BookingNodeConnection;
  secondaryEmail?: Maybe<Scalars['String']>;
  /** Erforderlich. 150 Zeichen oder weniger. Nur Buchstaben, Ziffern und @/./+/-/_. */
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};


export type UserNodeRentalsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type RegisterMutation = { __typename: 'Mutation', register?: { __typename?: 'Register', success?: boolean | null | undefined, errors?: any | null | undefined } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', refreshToken?: string | null | undefined, token?: string | null | undefined } | null | undefined };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename: 'Mutation', refreshToken?: { __typename?: 'RefreshToken', refreshToken?: string | null | undefined, token?: string | null | undefined } | null | undefined };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename: 'Mutation', verifyAccount?: { __typename?: 'VerifyAccount', errors?: any | null | undefined, success?: boolean | null | undefined } | null | undefined };

export type CreateABookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateABookingMutation = { __typename: 'Mutation', createBooking?: { __typename?: 'CreateBookingMutation', booking?: { __typename?: 'BookingNode', id: string, uuid: any, state: BookingState, startDate: any, pickupTimestamp?: any | null | undefined } | null | undefined } | null | undefined };

export type BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsQuery = { __typename: 'Query', bookings?: { __typename?: 'BookingNodeConnection', edges: Array<{ __typename?: 'BookingNodeEdge', node?: { __typename?: 'BookingNode', uuid: any, startDate: any, pickupTimestamp?: any | null | undefined, state: BookingState } | null | undefined } | null | undefined> } | null | undefined };

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = { __typename: 'Query', me?: { __typename?: 'UserNode', email: string, firstName: string, lastName: string } | null | undefined };

export type BookedDatesQueryVariables = Exact<{
  bikeId: Scalars['Int'];
}>;


export type BookedDatesQuery = { __typename: 'Query', bookedDates?: Array<any | null | undefined> | null | undefined };

export type BookingFragment = { __typename?: 'BookingNode', token?: string | null | undefined, pickupTimestamp?: any | null | undefined, startDate: any, state: BookingState, bike: { __typename?: 'BikeNode', pickupStation?: { __typename?: 'PickupStationNode', locationCity?: string | null | undefined, locationPostalcode?: string | null | undefined, locationStreet?: string | null | undefined, contactTelephone?: string | null | undefined, contactName?: string | null | undefined } | null | undefined } };

export type BookingDetailsQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type BookingDetailsQuery = { __typename: 'Query', booking?: { __typename?: 'BookingNode', token?: string | null | undefined, pickupTimestamp?: any | null | undefined, startDate: any, state: BookingState, bike: { __typename?: 'BikeNode', pickupStation?: { __typename?: 'PickupStationNode', locationCity?: string | null | undefined, locationPostalcode?: string | null | undefined, locationStreet?: string | null | undefined, contactTelephone?: string | null | undefined, contactName?: string | null | undefined } | null | undefined } } | null | undefined };

export const BookingFragmentDoc = gql`
    fragment Booking on BookingNode {
  bike {
    pickupStation {
      locationCity
      locationPostalcode
      locationStreet
      contactTelephone
      contactName
    }
  }
  token
  pickupTimestamp
  startDate
  state
}
    `;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password1: String!, $password2: String!, $firstName: String!, $lastName: String!) {
  __typename
  register(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password1: $password1
    password2: $password2
    username: $email
  ) {
    success
    errors
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password1: // value for 'password1'
 *      password2: // value for 'password2'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  __typename
  tokenAuth(email: $email, password: $password) {
    refreshToken
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  __typename
  refreshToken(refreshToken: $refreshToken) {
    refreshToken
    token
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  __typename
  verifyAccount(token: $token) {
    errors
    success
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const CreateABookingDocument = gql`
    mutation CreateABooking($input: CreateBookingInput!) {
  __typename
  createBooking(input: $input) {
    booking {
      id
      uuid
      state
      startDate
      pickupTimestamp
    }
  }
}
    `;
export type CreateABookingMutationFn = Apollo.MutationFunction<CreateABookingMutation, CreateABookingMutationVariables>;

/**
 * __useCreateABookingMutation__
 *
 * To run a mutation, you first call `useCreateABookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateABookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createABookingMutation, { data, loading, error }] = useCreateABookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateABookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateABookingMutation, CreateABookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateABookingMutation, CreateABookingMutationVariables>(CreateABookingDocument, options);
      }
export type CreateABookingMutationHookResult = ReturnType<typeof useCreateABookingMutation>;
export type CreateABookingMutationResult = Apollo.MutationResult<CreateABookingMutation>;
export type CreateABookingMutationOptions = Apollo.BaseMutationOptions<CreateABookingMutation, CreateABookingMutationVariables>;
export const BookingsDocument = gql`
    query Bookings {
  __typename
  bookings {
    edges {
      node {
        uuid
        startDate
        pickupTimestamp
        state
      }
    }
  }
}
    `;

/**
 * __useBookingsQuery__
 *
 * To run a query within a React component, call `useBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookingsQuery(baseOptions?: Apollo.QueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
      }
export function useBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
        }
export type BookingsQueryHookResult = ReturnType<typeof useBookingsQuery>;
export type BookingsLazyQueryHookResult = ReturnType<typeof useBookingsLazyQuery>;
export type BookingsQueryResult = Apollo.QueryResult<BookingsQuery, BookingsQueryVariables>;
export const UserQueryDocument = gql`
    query UserQuery {
  __typename
  me {
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useUserQueryQuery__
 *
 * To run a query within a React component, call `useUserQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQueryQuery(baseOptions?: Apollo.QueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, options);
      }
export function useUserQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQueryQuery, UserQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQueryQuery, UserQueryQueryVariables>(UserQueryDocument, options);
        }
export type UserQueryQueryHookResult = ReturnType<typeof useUserQueryQuery>;
export type UserQueryLazyQueryHookResult = ReturnType<typeof useUserQueryLazyQuery>;
export type UserQueryQueryResult = Apollo.QueryResult<UserQueryQuery, UserQueryQueryVariables>;
export const BookedDatesDocument = gql`
    query BookedDates($bikeId: Int!) {
  __typename
  bookedDates(bikeId: $bikeId)
}
    `;

/**
 * __useBookedDatesQuery__
 *
 * To run a query within a React component, call `useBookedDatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookedDatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookedDatesQuery({
 *   variables: {
 *      bikeId: // value for 'bikeId'
 *   },
 * });
 */
export function useBookedDatesQuery(baseOptions: Apollo.QueryHookOptions<BookedDatesQuery, BookedDatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookedDatesQuery, BookedDatesQueryVariables>(BookedDatesDocument, options);
      }
export function useBookedDatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookedDatesQuery, BookedDatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookedDatesQuery, BookedDatesQueryVariables>(BookedDatesDocument, options);
        }
export type BookedDatesQueryHookResult = ReturnType<typeof useBookedDatesQuery>;
export type BookedDatesLazyQueryHookResult = ReturnType<typeof useBookedDatesLazyQuery>;
export type BookedDatesQueryResult = Apollo.QueryResult<BookedDatesQuery, BookedDatesQueryVariables>;
export const BookingDetailsDocument = gql`
    query BookingDetails($uuid: String!) {
  __typename
  booking(uuid: $uuid) {
    ...Booking
  }
}
    ${BookingFragmentDoc}`;

/**
 * __useBookingDetailsQuery__
 *
 * To run a query within a React component, call `useBookingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingDetailsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useBookingDetailsQuery(baseOptions: Apollo.QueryHookOptions<BookingDetailsQuery, BookingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingDetailsQuery, BookingDetailsQueryVariables>(BookingDetailsDocument, options);
      }
export function useBookingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingDetailsQuery, BookingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingDetailsQuery, BookingDetailsQueryVariables>(BookingDetailsDocument, options);
        }
export type BookingDetailsQueryHookResult = ReturnType<typeof useBookingDetailsQuery>;
export type BookingDetailsLazyQueryHookResult = ReturnType<typeof useBookingDetailsLazyQuery>;
export type BookingDetailsQueryResult = Apollo.QueryResult<BookingDetailsQuery, BookingDetailsQueryVariables>;