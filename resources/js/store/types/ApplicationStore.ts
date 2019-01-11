export interface IApplicationStore {
    // Application menu object
    menu: object;

    // Is application loaded
    loaded: boolean;

    // request status
    requestInProgress: boolean;

    // Server response message (in any cases)
    message: string;

    // Errors (ex. for validations)
    errors: [];
}
