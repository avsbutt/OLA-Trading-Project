import { faker } from '@faker-js/faker';

// Function to format the date as MMDDYYYY
const formatDateMMDDYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}${day}${year}`; // Return MMDDYYYY format
};

// Function to format the date as YYYY-MM-DD for date inputs fields
const formatDateYYYYMMDD = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // YYYY-MM-DD format 
};



// Get random DOB in both formats
const getRandomDateOfBirth = () => {
    const now = new Date();
    const minAge = 30; // Minimum age for account holder
    const minYear = 1930; // Earliest valid year for DOB

    // Calculate the latest possible DOB (30 years before today)
    const latestDOB = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());

    // Ensure that the latest DOB is not before 1930
    if (latestDOB.getFullYear() < minYear) {
        throw new Error(`The latest date of birth cannot be earlier than ${minYear}`);
    }

    // Calculate the earliest DOB (which should be 100 years ago)
    const earliestDOB = new Date(minYear, 0, 1); // January 1, 1930

    // Generate a random date between the earliest and latest DOB
    const randomDate = new Date(earliestDOB.getTime() + Math.random() * (latestDOB.getTime() - earliestDOB.getTime()));

    return {
        mmddyyyy: formatDateMMDDYYYY(randomDate), // MMDDYYYY format for display
        yyyymmdd: formatDateYYYYMMDD(randomDate), // YYYY-MM-DD format for input field
    };
};

// Function to generate random ID expiration and issue dates
const getRandomIssueAndExpirationDates = () => {
    const now = new Date();
    const issueDate = new Date(now.getFullYear() - Math.floor(Math.random() * 10), now.getMonth(), now.getDate());
    const expirationDate = faker.date.future(5, issueDate); // Ensure expiration is at least today or later

    return {
        issueDate: formatDateYYYYMMDD(issueDate),
        idExpirationDate: formatDateYYYYMMDD(expirationDate), // Update to use faker.date.future
    };
};





// ## Generate data with both MMDDYYYY and YYYY-MM-DD formats
export const generatePersonalInfoData = () => {
    const dob = getRandomDateOfBirth();
    const idDates = getRandomIssueAndExpirationDates();
    let cityName = faker.address.city().replace(/[^a-zA-Z ]/g, '');  // ## Generate city name with only alphabets

    return {

        //########--------PERSONAL INFORMATION--------########\\

        fName: faker.name.firstName(),
        mName: faker.name.middleName(),
        lName: faker.name.lastName(),
        email: faker.internet.email(),
        randomWords: faker.lorem.words(3),
        nOfDependents: faker.number.int({ min: 0, max: 99 }),
        primaryTelephone: faker.string.numeric(14),
        idNumber: faker.string.numeric(15),
        socialSecurityNo: faker.string.numeric(9),
        dobMMDDYYYY: dob.mmddyyyy,  // MMDDYYYY format for display
        dobYYYYMMDD: dob.yyyymmdd,  // YYYY-MM-DD format for input field
        idIssueDate: idDates.issueDate,
        idExpirationDate: idDates.idExpirationDate,
        //idExpirationDate: faker.date.future,



        //########--------PHYSICAL ADDRESS--------########\\

        city: cityName, // Generate random city name
        postalCode: faker.string.numeric(5), // Generates a random 5-digit postal code
        address: faker.location.streetAddress(),



        //########--------TRUSTED CONTACT--------########\\

        trustedFirstName: faker.name.firstName(),
        trustedLastName: faker.name.lastName(),
        trustedTelephone: faker.string.numeric(16),
        trustedEmail: faker.internet.email(),
        trustedMailingAddress1: faker.location.streetAddress(),
        trustedCity: cityName,
        trustedPostalCode: faker.string.numeric(5),

    };
};
