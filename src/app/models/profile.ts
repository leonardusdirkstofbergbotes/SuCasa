import { UserType } from "../enums/userType"

export interface Profile {
    PersonalDetail: PersonalDetails,
    ServicesAndRates: ServiceAndRate[],
    BioAndDescription: BioAndDescription,
    PaymentDetails: PaymentDetails[],
    Location: Location
}

export interface PersonalDetails {
    UID: string,
    ProfilePicture: AWSFileLocation,
    Email: string,
    UserType: UserType,
    FirstName: string,
    LastName: string,
    IDNumber: string,
    Gender: string,
    Age: number
}

export interface ServiceAndRate {
    ServiceID: string,
    Rate: number,
    Frequency: string,
    Note: string
}

export interface BioAndDescription {
    Bio: string | null,
    Certifications: AWSFileLocation[],
    Images: AWSFileLocation[]
}

export interface AWSFileLocation {
    location: string,
    name: string
}

export interface PaymentDetails {
    MethodId: string,
    AccountDetails: object,
    Note: string
}  

export interface Location {
    Country: string,
    State: string,
    City: string,
    PostalCode: string,
    Range: number
}  