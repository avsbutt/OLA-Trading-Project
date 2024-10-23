import { faker } from '@faker-js/faker';

export const generatePersonalInfoData = () => {
    return {
        fName: faker.name.firstName(),
        mName: faker.name.middleName(),
        lName: faker.name.lastName(),
        email: faker.internet.email(), // Generates a valid email
        nOfDependents: faker.number.int({ min: 0, max: 99 }), // Generates a random number of dependents (0 to 99)
        primaryTelephone: faker.string.numeric(14), // Generates a 14-digit phone number
        idNumber: faker.string.numeric(15) // Generates a 15-digit ID number
    
    
    };
};
