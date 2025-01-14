export interface Schedule {
    Id:number;
    Name:string;
    Owner:string;
    ExpirationDate:Date|null;
    DistributionGroups:DistributionGroup[];
    TriggerGroups:TriggerGroup[];
    DisableFlag:boolean;
    Unsubscriptions:string[];

}

export interface DistributionGroup {
    Id:number;
    Name:string;
    Entries:(EmailDistribution|FileDistribution)[];

}

export interface EmailDistribution{
    Id:number;
    EmailAddresses:string[];
    __type:"EmailDistribution:#BatchReports.Models.Distributions";
}

export interface FileDistribution {
    Id:number;
    FileDestinations:FileDestination[];
    __type:"FileDistribution:#BatchReports.Models.Distributions";

}

export interface FileDestination{
    FileLocation:string
}

export interface TriggerGroup {
    Id:number;
    Name:string;
}



