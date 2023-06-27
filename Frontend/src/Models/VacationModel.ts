class VacationModel{
    public vacationId:number
    public target:string
    public description:string
    public startDate:string
    public endDate:string
    public price:number
    public image: FileList;
    public imageName: string;
    public src: string;
    public followersCount: number;
    public isFollowing: boolean;

    public static targetValidation = {
        required:{value: true, message: "target required!"},
        minLength:{value: 4, message: "target has to be longer than 4 characters!"},
        maxLength:{value: 200, message: "too long target!"},
    }
    
     public static descriptionValidation = {
            required:{value: true, message: "description required!"},
            minLength:{value: 4, message: "description has to be longer than 4 characters!"},
            maxLength:{value: 700, message: "too long description!"},
     }
     public static priceValidation = {
        required:{value: true, message: "price required!"},
        min:{value: 0, message: "price can't be negative!"},
        max:{value: 10000, message: "too high price!"},
    }

    public static image = {
        required:{value: true, message: "image required!"},
       
    }
}

export default VacationModel