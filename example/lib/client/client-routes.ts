import { Vid } from "../models/vid";

export type PostVidRequest = {};

export type PostVidResponse = Vid;

export type GetVidResponse = Vid;

export type DeleteVidResponse = {};

export type GetVidsResponse = Vid[];

export type GetUserVidsResponse = Vid[];

export type GetItemVidsResponse = Vid[];
