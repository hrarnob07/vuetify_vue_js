import {callToServer} from "./network";

export const getUser = async (data) => await callToServer('get',`todos/1`,data);
