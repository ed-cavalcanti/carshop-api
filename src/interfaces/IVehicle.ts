import { z } from 'zod';

const yearMessage = 'Year must be greater than or equal to 1900 and less than or equal to 2022';

const VehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).int({ message: 'Year must be an integer' })
    .min(1900, { message: yearMessage })
    .max(2022, { message: yearMessage }),

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),

  status: z.boolean().optional(),

  buyValue: z.number({
    required_error: 'buyValue is required',
    invalid_type_error: 'buyValue must be a number',
  }).int({ message: 'buyValue must be an integer' }),
});

type IVehicle = z.infer<typeof VehicleZodSchema>;

export { IVehicle, VehicleZodSchema };