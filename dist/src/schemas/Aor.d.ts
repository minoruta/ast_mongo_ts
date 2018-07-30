export declare const AorDefinition: {
    _id: StringConstructor;
    contact: StringConstructor;
    minimum_expiration: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    default_expiration: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    qualify_timeout: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    support_path: BooleanConstructor;
    max_contacts: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    authenticate_qualify: BooleanConstructor;
    maximum_expiration: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    qualify_frequency: {
        type: NumberConstructor;
        min: number;
        integer: boolean;
    };
    remove_existing: BooleanConstructor;
};
