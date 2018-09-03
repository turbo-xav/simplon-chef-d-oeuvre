export interface IAppConfig {
    env: {
        production: boolean;
        name: string;
    };

    logging: {
        debug: boolean;

    };
    apiBack: {
       restUrl: string;
       jsonHeaders: {

       };
    };
}
