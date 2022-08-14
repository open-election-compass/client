import * as yup from 'yup';

export const incomingDataSchema = yup
  .object()
  .strict(true)
  .noUnknown()
  .shape({
    action: yup
      .string()
      .required()
      .oneOf(['SEND_PROFILE_TO_HOST', 'SEND_ANSWERS_TO_HOST', 'SEND_FRIEND_LIST_TO_GUESTS']),
    payload: yup.mixed().required(),
  });

export const friendProfileSchema = yup
  .object()
  .strict(true)
  .noUnknown()
  .shape({
    name: yup
      .string()
      .nullable()
      .matches(/^[\p{Letter}\p{Mark}\d\s]*$/u),
  });

export const friendAnswersSchema = yup.array().strict().of(yup.string().nullable());

export const friendSchema = yup
  .object()
  .strict(true)
  .noUnknown()
  .shape({
    peerId: yup
      .string()
      .required()
      .length(8)
      .matches(/^[\dA-Z]*$/),
    profile: friendProfileSchema,
    answers: friendAnswersSchema,
    dataUpdatedAt: yup.number().positive().integer(),
  });

export const friendsSchema = yup.array().of(friendSchema);
