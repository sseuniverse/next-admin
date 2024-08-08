"use server";

import { ActionParams, ModelName } from "@sse-ui/neadmin";
import {
  SearchPaginatedResourceParams,
  deleteResourceItems,
  searchPaginatedResource,
  submitForm,
} from "@sse-ui/neadmin/dist/actions";
import { options } from "../options";
import { prisma } from "../prisma";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const submitFormAction = async (
  params: ActionParams,
  formData: FormData
) => {
  return submitForm({ ...params, options, prisma }, formData);
};

export const submitEmail = async (
  model: ModelName,
  ids: number[] | string[]
) => {
  console.log("Sending email to " + ids.length + " users");
  await delay(1000);
};

export const deleteItem = async (
  model: ModelName,
  ids: string[] | number[]
) => {
  return deleteResourceItems(prisma, model, ids);
};

export const searchResource = async (
  actionParams: ActionParams,
  params: SearchPaginatedResourceParams
) => {
  return searchPaginatedResource({ ...actionParams, options, prisma }, params);
};
