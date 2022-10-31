import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  ExpectedErrorType: any;
  GenericScalar: any;
  Time: any;
  UUID: any;
};

export type BikeNode = Node & {
  __typename?: 'BikeNode';
  active: Scalars['Boolean'];
  bookings: BookingNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  logo?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pickupStation?: Maybe<PickupStationNode>;
  purchaseDate: Scalars['Date'];
  slug?: Maybe<Scalars['String']>;
  statusNote?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};


export type BikeNodeBookingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  created?: Maybe<Scalars['DateTime']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  pickupKilometers?: Maybe<Scalars['Int']>;
  pickupTimestamp?: Maybe<Scalars['Time']>;
  returnDate?: Maybe<Scalars['Date']>;
  returnKilometers?: Maybe<Scalars['Int']>;
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

export type CancelBookingMutation = {
  __typename?: 'CancelBookingMutation';
  booking?: Maybe<BookingNode>;
};

export type CreateBookingInput = {
  bikeUuid: Scalars['String'];
  pickupTimestamp: Scalars['Time'];
  returnDate: Scalars['Date'];
  returnTimestamp: Scalars['Time'];
  startDate: Scalars['Date'];
};

export type CreateBookingMutation = {
  __typename?: 'CreateBookingMutation';
  booking?: Maybe<BookingNode>;
};

/**
 * Delete account permanently or make `user.is_active=False`.
 *
 * The behavior is defined on settings.
 * Anyway user refresh tokens are revoked.
 *
 * User must be verified and confirm password.
 */
export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelBooking?: Maybe<CancelBookingMutation>;
  createBooking?: Maybe<CreateBookingMutation>;
  /**
   * Delete account permanently or make `user.is_active=False`.
   *
   * The behavior is defined on settings.
   * Anyway user refresh tokens are revoked.
   *
   * User must be verified and confirm password.
   */
  deleteAccount?: Maybe<DeleteAccount>;
  /**
   * Change account password when user knows the old password.
   *
   * A new token and refresh token are sent. User must be verified.
   */
  passwordChange?: Maybe<PasswordChange>;
  /**
   * Change user password without old password.
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, update
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordReset?: Maybe<PasswordReset>;
  /**
   * Set user password - for passwordless registration
   *
   * Receive the token that was sent by email.
   *
   * If token and new passwords are valid, set
   * user password and in case of using refresh
   * tokens, revoke all of them.
   *
   * Also, if user has not been verified yet, verify it.
   */
  passwordSet?: Maybe<PasswordSet>;
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
  /**
   * Sends activation email.
   *
   * It is called resend because theoretically
   * the first activation email was sent when
   * the user registered.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
  /**
   * Send password reset email.
   *
   * For non verified users, send an activation
   * email instead.
   *
   * Accepts both primary and secondary email.
   *
   * If there is no user with the requested email,
   * a successful response is returned.
   */
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
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


export type MutationCancelBookingArgs = {
  bookingUuid?: InputMaybe<Scalars['String']>;
};


export type MutationCreateBookingArgs = {
  input?: InputMaybe<CreateBookingInput>;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPasswordSetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
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


export type MutationResendActivationEmailArgs = {
  email: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  email?: InputMaybe<Scalars['String']>;
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

/**
 * Change account password when user knows the old password.
 *
 * A new token and refresh token are sent. User must be verified.
 */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Change user password without old password.
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, update
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordReset = {
  __typename?: 'PasswordReset';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

/**
 * Set user password - for passwordless registration
 *
 * Receive the token that was sent by email.
 *
 * If token and new passwords are valid, set
 * user password and in case of using refresh
 * tokens, revoke all of them.
 *
 * Also, if user has not been verified yet, verify it.
 */
export type PasswordSet = {
  __typename?: 'PasswordSet';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PickupStationNode = Node & {
  __typename?: 'PickupStationNode';
  /** Buchungen sollen automatisch bestätigt werden, eine manuelle Freigabe ist nicht erforderlich. */
  autoConfirm: Scalars['Boolean'];
  bikes: BikeNodeConnection;
  contactName?: Maybe<Scalars['String']>;
  contactTelephone?: Maybe<Scalars['String']>;
  /** Frühste Abholzeit */
  earliestPickupTime?: Maybe<Scalars['Time']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Späteste Rückgabezeit */
  latestReturnTime?: Maybe<Scalars['Time']>;
  locationCity?: Maybe<Scalars['String']>;
  locationDescription?: Maybe<Scalars['String']>;
  locationPostalcode?: Maybe<Scalars['String']>;
  locationStreet?: Maybe<Scalars['String']>;
  /** Für wieviel aufeinanderfolgende Tage darf bei dieser Station ausgeliehen werden? */
  maxConsecutiveDays: Scalars['Int'];
  name: Scalars['String'];
  /** Mehrere Adressen durch Kommata separieren. */
  notificationEmails?: Maybe<Scalars['String']>;
  terms?: Maybe<Scalars['String']>;
};


export type PickupStationNodeBikesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PickupStationNodeConnection = {
  __typename?: 'PickupStationNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PickupStationNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PickupStationNode` and its cursor. */
export type PickupStationNodeEdge = {
  __typename?: 'PickupStationNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PickupStationNode>;
};

export type Query = {
  __typename?: 'Query';
  bikes?: Maybe<BikeNodeConnection>;
  bookedDates?: Maybe<Array<Maybe<Scalars['Date']>>>;
  booking?: Maybe<BookingNode>;
  bookings?: Maybe<BookingNodeConnection>;
  me?: Maybe<UserNode>;
  pickupStation?: Maybe<PickupStationNode>;
  stats?: Maybe<Stats>;
};


export type QueryBikesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryBookedDatesArgs = {
  bikeUuid: Scalars['String'];
};


export type QueryBookingArgs = {
  uuid: Scalars['String'];
};


export type QueryBookingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPickupStationArgs = {
  bikeUuid: Scalars['String'];
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
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

/**
 * Sends activation email.
 *
 * It is called resend because theoretically
 * the first activation email was sent when
 * the user registered.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type ResendActivationEmail = {
  __typename?: 'ResendActivationEmail';
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

/**
 * Send password reset email.
 *
 * For non verified users, send an activation
 * email instead.
 *
 * Accepts both primary and secondary email.
 *
 * If there is no user with the requested email,
 * a successful response is returned.
 */
export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Stats = {
  __typename?: 'Stats';
  bookings?: Maybe<Scalars['Int']>;
  kilometers?: Maybe<Scalars['Int']>;
  users?: Maybe<Scalars['Int']>;
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
  pickupStations: PickupStationNodeConnection;
  pk?: Maybe<Scalars['Int']>;
  rentals: BookingNodeConnection;
  secondaryEmail?: Maybe<Scalars['String']>;
  /** Erforderlich. 150 Zeichen oder weniger. Nur Buchstaben, Ziffern und @/./+/-/_. */
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};


export type UserNodePickupStationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserNodeRentalsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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


export type RegisterMutation = { __typename: 'Mutation', register?: { __typename?: 'Register', success?: boolean | null, errors?: any | null, token?: string | null, refreshToken?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', refreshToken?: string | null, token?: string | null } | null };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename: 'Mutation', refreshToken?: { __typename?: 'RefreshToken', refreshToken?: string | null, token?: string | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename: 'Mutation', verifyAccount?: { __typename?: 'VerifyAccount', errors?: any | null, success?: boolean | null } | null };

export type CreateABookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateABookingMutation = { __typename: 'Mutation', createBooking?: { __typename?: 'CreateBookingMutation', booking?: { __typename?: 'BookingNode', id: string, uuid: any, state: BookingState, startDate: any, pickupTimestamp?: any | null } | null } | null };

export type CancelThatBookingMutationVariables = Exact<{
  bookingUuid: Scalars['String'];
}>;


export type CancelThatBookingMutation = { __typename: 'Mutation', cancelBooking?: { __typename?: 'CancelBookingMutation', booking?: { __typename: 'BookingNode', id: string, uuid: any, state: BookingState, startDate: any, pickupTimestamp?: any | null } | null } | null };

export type ResendActiviationEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendActiviationEmailMutation = { __typename: 'Mutation', resendActivationEmail?: { __typename?: 'ResendActivationEmail', errors?: any | null, success?: boolean | null } | null };

export type SendPasswordResetEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendPasswordResetEmailMutation = { __typename: 'Mutation', sendPasswordResetEmail?: { __typename?: 'SendPasswordResetEmail', success?: boolean | null, errors?: any | null } | null };

export type PasswordResetMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
}>;


export type PasswordResetMutation = { __typename: 'Mutation', passwordReset?: { __typename?: 'PasswordReset', success?: boolean | null, errors?: any | null } | null };

export type PickupStationFragment = { __typename?: 'PickupStationNode', id: string, locationCity?: string | null, locationPostalcode?: string | null, locationStreet?: string | null, locationDescription?: string | null, contactTelephone?: string | null, contactName?: string | null, terms?: string | null, maxConsecutiveDays: number, earliestPickupTime?: any | null, latestReturnTime?: any | null };

export type BookingFragment = { __typename?: 'BookingNode', uuid: any, token?: string | null, pickupTimestamp?: any | null, returnTimestamp?: any | null, startDate: any, returnDate?: any | null, state: BookingState, bike: { __typename?: 'BikeNode', name: string, pickupStation?: { __typename?: 'PickupStationNode', id: string, locationCity?: string | null, locationPostalcode?: string | null, locationStreet?: string | null, locationDescription?: string | null, contactTelephone?: string | null, contactName?: string | null, terms?: string | null, maxConsecutiveDays: number, earliestPickupTime?: any | null, latestReturnTime?: any | null } | null } };

export type BikeFragment = { __typename?: 'BikeNode', uuid: any, name: string, model?: string | null, slug?: string | null, active: boolean, statusNote?: string | null, pickupStation?: { __typename?: 'PickupStationNode', id: string, locationCity?: string | null, locationPostalcode?: string | null, locationStreet?: string | null, locationDescription?: string | null, contactTelephone?: string | null, contactName?: string | null, terms?: string | null, maxConsecutiveDays: number, earliestPickupTime?: any | null, latestReturnTime?: any | null } | null };

export type BikesQueryVariables = Exact<{ [key: string]: never; }>;


export type BikesQuery = { __typename?: 'Query', bikes?: { __typename?: 'BikeNodeConnection', edges: Array<{ __typename?: 'BikeNodeEdge', node?: { __typename?: 'BikeNode', uuid: any, name: string, model?: string | null, slug?: string | null, active: boolean, statusNote?: string | null, pickupStation?: { __typename?: 'PickupStationNode', id: string, locationCity?: string | null, locationPostalcode?: string | null, locationStreet?: string | null, locationDescription?: string | null, contactTelephone?: string | null, contactName?: string | null, terms?: string | null, maxConsecutiveDays: number, earliestPickupTime?: any | null, latestReturnTime?: any | null } | null } | null } | null> } | null };

export type BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsQuery = { __typename: 'Query', bookings?: { __typename?: 'BookingNodeConnection', edges: Array<{ __typename?: 'BookingNodeEdge', node?: { __typename?: 'BookingNode', uuid: any, startDate: any, pickupTimestamp?: any | null, state: BookingState, bike: { __typename?: 'BikeNode', name: string } } | null } | null> } | null };

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = { __typename: 'Query', me?: { __typename?: 'UserNode', email: string, firstName: string, lastName: string, verified?: boolean | null } | null };

export type BookedDatesQueryVariables = Exact<{
  bikeUuid: Scalars['String'];
}>;


export type BookedDatesQuery = { __typename: 'Query', bookedDates?: Array<any | null> | null };

export type BookingDetailsQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type BookingDetailsQuery = { __typename: 'Query', booking?: { __typename?: 'BookingNode', uuid: any, token?: string | null, pickupTimestamp?: any | null, returnTimestamp?: any | null, startDate: any, returnDate?: any | null, state: BookingState, bike: { __typename?: 'BikeNode', name: string, pickupStation?: { __typename?: 'PickupStationNode', id: string, locationCity?: string | null, locationPostalcode?: string | null, locationStreet?: string | null, locationDescription?: string | null, contactTelephone?: string | null, contactName?: string | null, terms?: string | null, maxConsecutiveDays: number, earliestPickupTime?: any | null, latestReturnTime?: any | null } | null } } | null };

export type StatsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type StatsQueryQuery = { __typename?: 'Query', stats?: { __typename?: 'Stats', users?: number | null, kilometers?: number | null, bookings?: number | null } | null };

export type PickupStationQueryVariables = Exact<{
  bikeUuid: Scalars['String'];
}>;


export type PickupStationQuery = { __typename: 'Query', pickupStation?: { __typename?: 'PickupStationNode', id: string, locationCity?: string | null, locationPostalcode?: string | null, locationStreet?: string | null, locationDescription?: string | null, contactTelephone?: string | null, contactName?: string | null, terms?: string | null, maxConsecutiveDays: number, earliestPickupTime?: any | null, latestReturnTime?: any | null } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "BikeNode",
        "fields": [
          {
            "name": "active",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "bookings",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookingNodeConnection",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "logo",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "model",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pickupStation",
            "type": {
              "kind": "OBJECT",
              "name": "PickupStationNode",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "purchaseDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "slug",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "statusNote",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "uuid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BikeNodeConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "BikeNodeEdge",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BikeNodeEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "BikeNode",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookingNode",
        "fields": [
          {
            "name": "bike",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BikeNode",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "created",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "notes",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pickupKilometers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "pickupTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "returnDate",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "returnKilometers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "returnTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "startDate",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "state",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "uuid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "BookingNodeConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "BookingNodeEdge",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BookingNodeEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "BookingNode",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CancelBookingMutation",
        "fields": [
          {
            "name": "booking",
            "type": {
              "kind": "OBJECT",
              "name": "BookingNode",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CreateBookingMutation",
        "fields": [
          {
            "name": "booking",
            "type": {
              "kind": "OBJECT",
              "name": "BookingNode",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DeleteAccount",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "cancelBooking",
            "type": {
              "kind": "OBJECT",
              "name": "CancelBookingMutation",
              "ofType": null
            },
            "args": [
              {
                "name": "bookingUuid",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "createBooking",
            "type": {
              "kind": "OBJECT",
              "name": "CreateBookingMutation",
              "ofType": null
            },
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "deleteAccount",
            "type": {
              "kind": "OBJECT",
              "name": "DeleteAccount",
              "ofType": null
            },
            "args": [
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "passwordChange",
            "type": {
              "kind": "OBJECT",
              "name": "PasswordChange",
              "ofType": null
            },
            "args": [
              {
                "name": "newPassword1",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "newPassword2",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "oldPassword",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "passwordReset",
            "type": {
              "kind": "OBJECT",
              "name": "PasswordReset",
              "ofType": null
            },
            "args": [
              {
                "name": "newPassword1",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "newPassword2",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "token",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "passwordSet",
            "type": {
              "kind": "OBJECT",
              "name": "PasswordSet",
              "ofType": null
            },
            "args": [
              {
                "name": "newPassword1",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "newPassword2",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "token",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "OBJECT",
              "name": "RefreshToken",
              "ofType": null
            },
            "args": [
              {
                "name": "refreshToken",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "register",
            "type": {
              "kind": "OBJECT",
              "name": "Register",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "firstName",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "lastName",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password1",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "password2",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "username",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "resendActivationEmail",
            "type": {
              "kind": "OBJECT",
              "name": "ResendActivationEmail",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "revokeToken",
            "type": {
              "kind": "OBJECT",
              "name": "RevokeToken",
              "ofType": null
            },
            "args": [
              {
                "name": "refreshToken",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "sendPasswordResetEmail",
            "type": {
              "kind": "OBJECT",
              "name": "SendPasswordResetEmail",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "tokenAuth",
            "type": {
              "kind": "OBJECT",
              "name": "ObtainJSONWebToken",
              "ofType": null
            },
            "args": [
              {
                "name": "email",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "password",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "verifyAccount",
            "type": {
              "kind": "OBJECT",
              "name": "VerifyAccount",
              "ofType": null
            },
            "args": [
              {
                "name": "token",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "verifyToken",
            "type": {
              "kind": "OBJECT",
              "name": "VerifyToken",
              "ofType": null
            },
            "args": [
              {
                "name": "token",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "Node",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "BikeNode"
          },
          {
            "kind": "OBJECT",
            "name": "BookingNode"
          },
          {
            "kind": "OBJECT",
            "name": "PickupStationNode"
          },
          {
            "kind": "OBJECT",
            "name": "UserNode"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ObtainJSONWebToken",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "unarchiving",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "UserNode",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PageInfo",
        "fields": [
          {
            "name": "endCursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "hasNextPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "hasPreviousPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "startCursor",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PasswordChange",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PasswordReset",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PasswordSet",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PickupStationNode",
        "fields": [
          {
            "name": "autoConfirm",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "bikes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BikeNodeConnection",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "contactName",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "contactTelephone",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "earliestPickupTime",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "latestReturnTime",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "locationCity",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "locationDescription",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "locationPostalcode",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "locationStreet",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "maxConsecutiveDays",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "notificationEmails",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "terms",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PickupStationNodeConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PickupStationNodeEdge",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PickupStationNodeEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "node",
            "type": {
              "kind": "OBJECT",
              "name": "PickupStationNode",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "bikes",
            "type": {
              "kind": "OBJECT",
              "name": "BikeNodeConnection",
              "ofType": null
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "bookedDates",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": [
              {
                "name": "bikeUuid",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "booking",
            "type": {
              "kind": "OBJECT",
              "name": "BookingNode",
              "ofType": null
            },
            "args": [
              {
                "name": "uuid",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "bookings",
            "type": {
              "kind": "OBJECT",
              "name": "BookingNodeConnection",
              "ofType": null
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "me",
            "type": {
              "kind": "OBJECT",
              "name": "UserNode",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "pickupStation",
            "type": {
              "kind": "OBJECT",
              "name": "PickupStationNode",
              "ofType": null
            },
            "args": [
              {
                "name": "bikeUuid",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "stats",
            "type": {
              "kind": "OBJECT",
              "name": "Stats",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RefreshToken",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "payload",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Register",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "refreshToken",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ResendActivationEmail",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RevokeToken",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "revoked",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SendPasswordResetEmail",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Stats",
        "fields": [
          {
            "name": "bookings",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "kilometers",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "users",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserNode",
        "fields": [
          {
            "name": "archived",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "dateJoined",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "email",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "firstName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isActive",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "isStaff",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "lastLogin",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "lastName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "pickupStations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PickupStationNodeConnection",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "pk",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "rentals",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BookingNodeConnection",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Any"
                }
              }
            ]
          },
          {
            "name": "secondaryEmail",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "verified",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "VerifyAccount",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "VerifyToken",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "payload",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;
export const PickupStationFragmentDoc = gql`
    fragment PickupStation on PickupStationNode {
  id
  locationCity
  locationPostalcode
  locationStreet
  locationDescription
  contactTelephone
  contactName
  terms
  maxConsecutiveDays
  earliestPickupTime
  latestReturnTime
}
    `;
export const BookingFragmentDoc = gql`
    fragment Booking on BookingNode {
  uuid
  bike {
    name
    pickupStation {
      ...PickupStation
    }
  }
  token
  pickupTimestamp
  returnTimestamp
  startDate
  returnDate
  state
}
    ${PickupStationFragmentDoc}`;
export const BikeFragmentDoc = gql`
    fragment Bike on BikeNode {
  uuid
  name
  model
  slug
  active
  statusNote
  pickupStation {
    ...PickupStation
  }
}
    ${PickupStationFragmentDoc}`;
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
    token
    refreshToken
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  __typename
  tokenAuth(email: $email, password: $password) {
    refreshToken
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  __typename
  refreshToken(refreshToken: $refreshToken) {
    refreshToken
    token
  }
}
    `;

export function useRefreshTokenMutation() {
  return Urql.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument);
};
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  __typename
  verifyAccount(token: $token) {
    errors
    success
  }
}
    `;

export function useVerifyEmailMutation() {
  return Urql.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument);
};
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

export function useCreateABookingMutation() {
  return Urql.useMutation<CreateABookingMutation, CreateABookingMutationVariables>(CreateABookingDocument);
};
export const CancelThatBookingDocument = gql`
    mutation CancelThatBooking($bookingUuid: String!) {
  __typename
  cancelBooking(bookingUuid: $bookingUuid) {
    booking {
      __typename
      id
      uuid
      state
      startDate
      pickupTimestamp
    }
  }
}
    `;

export function useCancelThatBookingMutation() {
  return Urql.useMutation<CancelThatBookingMutation, CancelThatBookingMutationVariables>(CancelThatBookingDocument);
};
export const ResendActiviationEmailDocument = gql`
    mutation ResendActiviationEmail($email: String!) {
  __typename
  resendActivationEmail(email: $email) {
    errors
    success
  }
}
    `;

export function useResendActiviationEmailMutation() {
  return Urql.useMutation<ResendActiviationEmailMutation, ResendActiviationEmailMutationVariables>(ResendActiviationEmailDocument);
};
export const SendPasswordResetEmailDocument = gql`
    mutation SendPasswordResetEmail($email: String!) {
  __typename
  sendPasswordResetEmail(email: $email) {
    success
    errors
  }
}
    `;

export function useSendPasswordResetEmailMutation() {
  return Urql.useMutation<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>(SendPasswordResetEmailDocument);
};
export const PasswordResetDocument = gql`
    mutation PasswordReset($token: String!, $newPassword1: String!, $newPassword2: String!) {
  __typename
  passwordReset(
    token: $token
    newPassword1: $newPassword1
    newPassword2: $newPassword2
  ) {
    success
    errors
  }
}
    `;

export function usePasswordResetMutation() {
  return Urql.useMutation<PasswordResetMutation, PasswordResetMutationVariables>(PasswordResetDocument);
};
export const BikesDocument = gql`
    query Bikes {
  bikes {
    edges {
      node {
        ...Bike
      }
    }
  }
}
    ${BikeFragmentDoc}`;

export function useBikesQuery(options?: Omit<Urql.UseQueryArgs<BikesQueryVariables>, 'query'>) {
  return Urql.useQuery<BikesQuery, BikesQueryVariables>({ query: BikesDocument, ...options });
};
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
        bike {
          name
        }
      }
    }
  }
}
    `;

export function useBookingsQuery(options?: Omit<Urql.UseQueryArgs<BookingsQueryVariables>, 'query'>) {
  return Urql.useQuery<BookingsQuery, BookingsQueryVariables>({ query: BookingsDocument, ...options });
};
export const UserQueryDocument = gql`
    query UserQuery {
  __typename
  me {
    email
    firstName
    lastName
    verified
  }
}
    `;

export function useUserQueryQuery(options?: Omit<Urql.UseQueryArgs<UserQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQueryQuery, UserQueryQueryVariables>({ query: UserQueryDocument, ...options });
};
export const BookedDatesDocument = gql`
    query BookedDates($bikeUuid: String!) {
  __typename
  bookedDates(bikeUuid: $bikeUuid)
}
    `;

export function useBookedDatesQuery(options: Omit<Urql.UseQueryArgs<BookedDatesQueryVariables>, 'query'>) {
  return Urql.useQuery<BookedDatesQuery, BookedDatesQueryVariables>({ query: BookedDatesDocument, ...options });
};
export const BookingDetailsDocument = gql`
    query BookingDetails($uuid: String!) {
  __typename
  booking(uuid: $uuid) {
    ...Booking
  }
}
    ${BookingFragmentDoc}`;

export function useBookingDetailsQuery(options: Omit<Urql.UseQueryArgs<BookingDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<BookingDetailsQuery, BookingDetailsQueryVariables>({ query: BookingDetailsDocument, ...options });
};
export const StatsQueryDocument = gql`
    query StatsQuery {
  stats {
    users
    kilometers
    bookings
  }
}
    `;

export function useStatsQueryQuery(options?: Omit<Urql.UseQueryArgs<StatsQueryQueryVariables>, 'query'>) {
  return Urql.useQuery<StatsQueryQuery, StatsQueryQueryVariables>({ query: StatsQueryDocument, ...options });
};
export const PickupStationDocument = gql`
    query PickupStation($bikeUuid: String!) {
  __typename
  pickupStation(bikeUuid: $bikeUuid) {
    ...PickupStation
  }
}
    ${PickupStationFragmentDoc}`;

export function usePickupStationQuery(options: Omit<Urql.UseQueryArgs<PickupStationQueryVariables>, 'query'>) {
  return Urql.useQuery<PickupStationQuery, PickupStationQueryVariables>({ query: PickupStationDocument, ...options });
};