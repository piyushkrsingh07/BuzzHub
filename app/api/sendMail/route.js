import { transporter } from "@/app/config/mailConfig";
import userRepository from "@/app/repositories/userRepository";
import { customErrorResponse, internalErrorResponse, successResponse } from "@/app/utils/common/responseObjects"
import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function POST(request){
     try{
             const receiverMailId = request.nextUrl.searchParams.get("to");
    console.log(receiverMailId, "see receiver mail id");
                console.log(receiverMailId,'see receiver mail id')
              // const getUser=await userRepository.getByEmail(receiverMailId)
              const user=await userRepository.getByEmail(receiverMailId)

              console.log(user,'see user befoe sending the mail')

              const mailOptions={
    from:process.env.MAIL_ID,
    to:receiverMailId,
    subject:'Welcome email to buzz hub',
    text:`Welcome to the application `,
    html: `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rush Hour Registration Confirmation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    body {
      font-family: 'Roboto', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #007bff;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .content {
      padding: 20px;
    }
    h1 {
      margin: 0;
      font-size: 24px;
    }
    h2 {
      color: #007bff;
    }
    .details {
      background-color: #f8f9fa;
      border-radius: 4px;
      padding: 15px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background-color: #f8f9fa;
      color: #6c757d;
    }
    @media (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Rush Hour Coding Event</h1>
    </div>
    <div class="content">
      <h2>Registration Confirmation</h2>

      <p>Thank you for registering for the Rush Hour Coding Event! We're excited to have you participate in this thrilling coding challenge. Here are the details of your registration:</p>
      
      <div class="details">

        <p><strong>Date:</strong> Saturday, December 9, 2023</p>
        <p><strong>Time:</strong> 10:00 AM - 2:00 PM</p>
        <p><strong>Venue:</strong> Computer Science Building, Room 301</p>
        <p><strong>What to Bring:</strong> Laptops, chargers, and your coding spirit!</p>
      </div>
      
      <h3>Event Schedule:</h3>
      <ul>
        <li>9:30 AM - 10:00 AM: Check-in and Setup</li>
        <li>10:00 AM - 10:15 AM: Opening Remarks</li>
        <li>10:15 AM - 1:45 PM: Coding Challenge</li>
        <li>1:45 PM - 2:00 PM: Wrap-up and Announcements</li>
      </ul>
      
      <p>Remember, this is a team event. Work together, communicate effectively, and most importantly, have fun!</p>
      
      <p>If you have any questions or need to make changes to your registration, please contact us at <a href="mailto:bdcoe@akgec.ac.in">bdcoe@akgec.ac.in</a>.</p>
      
      <p>Best of luck, and may the best team win!</p>
      
      <p>Regards,<br>BDCOE Team</p>
    </div>
    <div class="footer">
      <p>©️ 2024 Big Data Center of Excellence . All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
    };


const apiresponse=await transporter.sendMail(mailOptions)
console.log(apiresponse,'see response at api')




                     return NextResponse.json({message:successResponse('Mail sent successfully')},{ status:StatusCodes.OK })
                      
    
    
        }catch(error){
                 console.log(error,'yha dekho catch hua ki nhi mail m')
                 if(error.statusCode){
                     return NextResponse.json(
                         {
                             status:error.statusCode
                         },{
                             message:customErrorResponse(error)
                         }
                     )
                 }
                 return NextResponse.json(
                      { status:StatusCodes.INTERNAL_SERVER_ERROR },
                      {message:internalErrorResponse(error)}
                 )
        }
}