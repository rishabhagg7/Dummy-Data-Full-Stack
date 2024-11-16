import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Employee} from "../models/employee.model.js"
import {getJSONObjectsData} from "../utils/gemini.js"

const getRandomData = asyncHandler(async(req,res)=>{    
    const generatedData = await getJSONObjectsData();

    if(!generatedData){
        throw new ApiError(501,"Internal Server Error while generating dummy data");
    }
    const jsonData = await JSON.parse(generatedData.response.candidates[0].content.parts[0].text);
    if(!jsonData){
        throw new ApiError(502,"Internal Server Error while formatting dummy data");
    }

    const createdData = await Employee.create(jsonData);
    if(!createdData){
        throw new ApiError(503,"Internal Server Error while adding data to database");
    }
 
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdData,
            "Data generated successfully"
        )   
    )
})


const getAllData = asyncHandler(async(req,res)=>{
    const employees = await Employee.find();
    if(!employees){
        throw new ApiError(404,"No Employees Found!");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            employees,
            "Data fetched successfully"
        )
    )
})

const deleteAllData = asyncHandler(async(req,res)=>{
    const deletedData = await Employee.deleteMany();
    if(!deletedData){
        throw new ApiError(500,"Internal error while deleting data");
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Data deleted successfully"
        )
    )
})

const deleteEmployeeData = asyncHandler(async(req,res)=>{
    const {employeeId} = req.params;
    if(!employeeId){
        throw new ApiError(400,"Employee Id not found");
    }

    const employee = await Employee.findByIdAndDelete(employeeId);
    if(!employee){
        throw new ApiError(500,"Internal error while deleting data or employee may not exist");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Employee deleted successfully"
        )
    )
})

export {getRandomData,getAllData,deleteAllData,deleteEmployeeData};