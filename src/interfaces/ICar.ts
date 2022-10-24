import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const doorsMsg = 'doorsQty must be greater than or equal to 2 and less than or equal to 4';
const seatsMsg = 'seatsQty must be greater than or equal to 2 and less than or equal to 7';

const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
    invalid_type_error: 'doorsQty must be a number',
  })
    .int({ message: 'DoorsQty must be an integer' })
    .min(2, { message: doorsMsg })
    .max(4, { message: doorsMsg }),

  seatsQty: z.number({
    required_error: 'seatsQty is required',
    invalid_type_error: 'seatsQty must be a number',
  })
    .int({ message: 'seatsQty must be an integer' })
    .min(2, { message: seatsMsg })
    .max(7, { message: seatsMsg }),
});

type ICar = z.infer<typeof CarZodSchema>;

export { ICar, CarZodSchema };
