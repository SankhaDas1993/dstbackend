const sendMailTemplates = async (json, type) => {
    let html_content;
    if (type === 1) {
        html_content =
            `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Enquiry Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .highlight {
            background-color: yellow;
            font-weight: bold;
        }
        .container {
            border: 1px solid #ddd;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p class="highlight">TO PROJECT MANAGER</p>
        <p><strong>Subject:</strong> New Project Enquiry</p>
        <div class="content">
            <p>Greetings Rajib Banerjee,</p>
            <p>We have received a new project enquiry from a potential client. Below are the details:</p>
            <p><strong>Client Name:</strong> ${json.name}</p>
            <p><strong>Email:</strong>${json.email}</p>
            <p><strong>Subject:</strong> ${json.subject}</p>
            <p><strong>Message:</strong> ${json.details}</p>
            <p>For further information or to discuss this enquiry in more detail, please contact the client directly using the provided email address.</p>
        </div>
        <div class="footer">
            <p>Best regards,</p>
            <p>Delostyle Studio Private Limited,</p>
            <p>www.delostylestudio.com</p>
        </div>
    </div>
</body>
</html>
        
        `
    } else if (type === 2) {
        html_content =   `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Enquiry</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <p>Greetings Rajib Banerjee,</p>
        <p>We have received a new project enquiry from a potential client. Below are the details:</p>
        <ul>
            <li><strong>Client Name:</strong> ${json.clientname}</li>
            <li><strong>Email:</strong> ${json.email}</li>
            <li><strong>Phone Number:</strong>${json.phone}</li>
            <li><strong>Address:</strong>${json.address}</li>
            <li><strong>Industry:</strong>${json.industry}</li>
            <li><strong>Number of resources required:</strong>${json.resources}</li>
            <li><strong>Number of days required:</strong>${json.duration}</li>
            <li><strong>Preferred service date and time:</strong>${new Date(json.servicedate).toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',', '')}</li>
            <li><strong>Message:</strong>${json.message}</li>
        </ul>
        <p>For further information or to discuss this enquiry in more detail, please contact the client directly using the provided email address.</p>
        <p>Best regards,</p>
        <p class="company-name">Delostyle Studio Private Limited</p>
        <p><a href="http://www.delostylestudio.com">www.delostylestudio.com</a></p>
    </div>
</body>
</html>

        
        
        `
    }else if(type===3){
        html_content = `Here is the CV`
    }
    return html_content
}

const responseMailTemplates = async (json, type) => {
    let res_content;
    if (type === 1) {
        res_content =

            `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Budget Enquiry</title>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
    <style>
    body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 20px;
}

.container {
    width: 60%;
    margin: 0 auto;
}

.subject {
    font-weight: bold;
    margin-bottom: 20px;
}

ol {
    margin: 20px 0;
    padding-left: 20px;
}

ol li {
    margin-bottom: 10px;
}

a {
    color: #0000EE;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
    </style>
        <div class="container">
            <p>Dear ${json.name},</p>
            <p>Thank you for reaching out and expressing your interest in our services. We are excited about the opportunity
                to collaborate with you on your upcoming project.</p>
            <p>To provide you with a comprehensive and accurate budget estimate, we would need a bit more information
                regarding your project. Could you please provide details on the following:</p>
            <ol>
                <li><strong>Project Scope:</strong> A brief overview of the project and its objectives.</li>
                <li><strong>Requirements:</strong> Specific functionalities or features you would like to include.</li>
                <li><strong>Timeline:</strong> The expected start date and desired completion date.</li>
                <li><strong>Budget Range:</strong> Any budget constraints or range you have in mind.</li>
                <li><strong>Additional Information:</strong> Any other relevant information that might help us understand
                    your project better.</li>
            </ol>
            <p>Once we have this information, we will be able to prepare a detailed proposal and budget estimate tailored to
                your needs. If you prefer, we can also schedule a call to discuss the project in more detail.</p>
            <p>Please feel free to contact me directly at <a
                    href="mailto:sankha.das@delostylestudio.com">sankha.das@delostylestudio.com</a> if you have any
                immediate questions or need further assistance.</p>
            <p>Looking forward to your response.</p>
            <p>Best regards,</p>
            <p><strong>Sankha Das</strong><br>
                Project Co-ordinator<br>
                Delostyle Studio Private Limited<br>
                <a href="mailto:delostylestudio@gmail.com">sankha.das@delostylestudio.com</a><br>
                <a href="http://www.delostylestudio.com">www.delostylestudio.com</a>
            </p>
        </div>
    </body>

    </html>
            
            `
    } else if (type === 2) {
        res_content =  `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation Response</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<style>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    width: 80%;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    margin-bottom: 10px;
}

.company-name {
    font-weight: bold;
}

a {
    color: #0066cc;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
    <div class="container">
        <p>Greetings ${json.clientname},</p>
        <p>Thank you for reaching out to us with your project quotation enquiry. We are excited about the opportunity to work with you and provide our services to support your needs.</p>
        <p>Based on the information provided in your application form, we have the following details:</p>
        <ul>
            <li><strong>Industry Type:</strong> ${json.industry}</li>
            <li><strong>Approximate Number of Resources Required:</strong> ${json.resources}</li>
            <li><strong>Project Duration:</strong> ${json.duration}</li>
            <li><strong>Preferred Service Date and Time:</strong> ${new Date(json.servicedate).toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',', '')}</li>
           
        </ul>
        <p>We are currently reviewing your requirements and will prepare a detailed quotation tailored to your specific needs. Our team aims to deliver a comprehensive proposal that includes the scope of work, timeline, and cost estimate.</p>
        <p>In the meantime, if you have any additional information or specific requirements that you would like us to consider, please feel free to share them with us. This will help us ensure that we address all your needs accurately.</p>
        <p>We appreciate your interest in our services and look forward to the possibility of collaborating on this project. You can expect to receive our quotation within 2 business days.</p>
        <p>Thank you once again for considering <span class="company-name">Delostyle Studio Private Limited</span>.</p>
        <br>
        <p>Best regards,</p>
        <p><span class="company-name">Delostyle Studio Private Limited</span></p>
        <p><a href="http://www.delostylestudio.com">www.delostylestudio.com</a></p>
    </div>
</body>
</html>


        `
    }else if(type===3){
        res_content = `Thank you for , we will get back with you `
    }
    return res_content

}

export {
    sendMailTemplates,
    responseMailTemplates
}