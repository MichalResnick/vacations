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
    public isFollowed: boolean;
}

export default VacationModel