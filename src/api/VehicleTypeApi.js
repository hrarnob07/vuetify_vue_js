import callToServer from './network';

export const index =() =>callToServer('get','vehicle-types/index');

