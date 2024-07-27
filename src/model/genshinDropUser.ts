import db from "../lib/db";
import {CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface GenshinDropUserInt {
    id: number
    number: number
    name: string
    csrf: string
    cookies: any
    data: any
    days: number
}


class GenshinDropUser extends Model<
    InferAttributes<GenshinDropUser>,
    InferCreationAttributes<GenshinDropUser>
> {
    // id can be undefined during creation when using `autoIncrement`
    declare id: CreationOptional<number>;
    declare number: number
    declare name: string
    declare csrf: string
    declare cookies: any
    declare data: any
    declare days: number
}

GenshinDropUser.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        number: {type: DataTypes.INTEGER, unique: true},
        csrf: {type: DataTypes.TEXT, unique: true},
        name: {type: DataTypes.TEXT, unique: true},
        cookies: {type: DataTypes.JSON},
        data: {type: DataTypes.JSON},
        days: {type: DataTypes.INTEGER},
    },
    {
        sequelize: db,
        tableName: 'GenshinDropUsers'
    })
export default GenshinDropUser
