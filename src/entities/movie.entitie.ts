import { Entity, 
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";


@Entity("movies")

export class Movie{
    @PrimaryGeneratedColumn("increment")
    id:number

    @Column({length:50,unique:true,nullable:false})
    name:string

    @Column({type:"text",nullable:true})
    description?:string | null | undefined 

    @Column({unsigned:true,nullable:false})
    duration:number

    @Column({unsigned:true,nullable:false})
    price:number
}
