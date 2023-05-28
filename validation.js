var message = document.getElementById('error').innerHTML;

function validateForm(){
    message = "";
    //--------------------111111-----------------------
    validateApplicantFileNumber();
    //-----------------------------------------------------
    validateFreshPassportCheck1_TC_SR_001();
    validateFreshPassportCheck1_TC_SR_007();
    //-----------------------------------------------------
    
    //--------------------22222222222----------------------
    validateApplicantName_TC_SR_008();
    validateAliases();
    validateChangedName();
    validateDateOfBirth();
    validatePlaceOfBirth_TC_AD_2_5();
    validateVoterId_TC_AD_2_10();
    validateEmploymentType();
    validate_2_8();
    validate_2_9();
    validate_2_10();
    validate_2_11();
    validateOrganizationName_TC_AD_2_12();
    validate_2_15();
    validate_2_16();
    validateAadharNumber_TC_AD_2_17();
    //-----------------------------------------------------
    
    //------------------33333333333-------------------------
    validateNames_TC_FD_3_1_1();
    validateFileNumberOfParent_TC_FD_3_5_1();
    //-----------------------------------------------------
    
    //--------------------4444444444-----------------------
    validateHouseNo_TC_PR_4_1_1();
    validate_TC_PR_4_1_2();
    validatePIN();
    validateMobileNo();
    //-----------------------------------------------------

    //--------------------5555555555-----------------------
    validate_TC_EC_5_3();
    //-----------------------------------------------------

    //--------------------6666666666-----------------------
    validate_TC_PP_6_1_1_2();
    validateDates_TC_PP_6_1_2_1();
    validateIssuePlace_TC_PP_6_1_3_1();
    validate_TC_PP_6_2_2_req();
    //-----------------------------------------------------
    
    //-------------------777777777-------------------------
    validateAlias7_1_1es();
    //-----------------------------------------------------
    
    //--------------------888888888888---------------------
    validateFees_TC_FD_8_1();
    validateFees_TC_FD_8_2();
     //---------------------------------------------------
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                            //11111111111111111111111111111111111111111111111111111111111111111111111111
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//validating required field of 1.1 and also if reissue is selected then required to select any reason from 1.2
function validateFreshPassportCheck1_TC_SR_001(){
    let selected_value1 = document.querySelector("input[type='radio'][name='applying-for']:checked");
    if(!selected_value1){
        message = message + "<a href='#freshPassportCheck'>Please select any one option of -> (1.1)applying for</a><br>";
    }else if(selected_value1.value == "Re-issue-of-Passport" ){
        let selected_value2 = document.querySelector("input[type='radio'][name='re-issue reason']:checked");
        if(!selected_value2){
            message = message + "<a href='#reissue-reason'>Please select any one reason as you are applying for re-issue</a><br>";
        }
    }else{
        message="";
    }
    document.getElementById('error').innerHTML = message;
}

//For making visible section 1.2 and 1.3 if reissue is selected and disabling checkboxes
function validateFreshPassportCheck1_TC_SR_003_1(){
    var div1 = document.getElementById("specify-reason");
    var div2 = document.getElementById("reissue-reason");
    div1.style.display = "block";
    div2.style.display = "block"; //showing 1.2 and 1.3 if reissue is selected
    reasonArray = document.getElementsByName("reason");
    for(var i = 0; i < reasonArray.length; i++){ //disabling the checkbox if reissue is selected 
         reasonArray[i].disabled= true;
    }
    validate_TC_PP_6_1_1_1();//hiding or displaying section-6
}

//Hiding 1.2 and 1.3 if fresh passport is selected
function validateFreshPassportCheck1_TC_SR_003_2(){
    var div1 = document.getElementById("specify-reason");
    var div2 = document.getElementById("reissue-reason");
    div1.style.display = "none";
    div2.style.display = "none";
    validate_TC_PP_6_1_1_1();//hiding or displaying section-6
}

//cheking if any option from 1.2 is selected and enabling or disabling options of 1.3
function validateFreshPassportCheck1_TC_SR_005(){
    let selected_value3 = document.querySelector("input[type='radio'][name='re-issue reason']:checked");
    reasonArray = document.getElementsByName("reason");

    if(!selected_value3){
        for(var i = 0; i < reasonArray.length; i++){
            reasonArray[i].disabled= true;
       }
    }else{
        for(var i = 0; i < reasonArray.length; i++){
            reasonArray[i].disabled= false;
       }
    }    
}

//validating required field of section 1.4, 1.5, 1.6
function validateFreshPassportCheck1_TC_SR_007(){
    let selected_value4 = document.querySelector("input[type='radio'][name='type']:checked");
    let selected_value5 = document.querySelector("input[type='radio'][name='booklet']:checked");
    let selected_value6 = document.querySelector("input[type='radio'][name='validity']:checked");
    if(!selected_value4){
        message = message + "<a href='#type-of-application'>Please select type of application from section 1.4</a><br>";
    }
    if(!selected_value5){
        message = message + "<a href='#pages'>Please select type of passport booklet section 1.5</a><br>";
    }
    if(!selected_value6){
        message = message + "<a href='#validity'>Please select any of validity from section 1.6</a><br>";
    }
    document.getElementById('error').innerHTML = message;

}

//validating applicant's file number in section 1
function validateApplicantFileNumber(){
    const applicantFileNumber = document.getElementById('fileNumber').value;
    if(!applicantFileNumber){
        message = message + "<a href='#fileNumber'>Filed cannot be empty, Please enter 12 digit file number </a><br>";
        document.getElementById('fileNumber').focus = true;
    }else if(!validateLength(applicantFileNumber)){
        message = message + "<a href='#fileNumber'>The length of file number should be 12 characters </a><br>";
        document.getElementById('fileNumber').focus = true;
    }else if(!validateSpecialCharacter(applicantFileNumber)){
        message = message + "<a href='#fileNumber'>Sorry! Special characters are not allowed in file number </a><br>";
        document.getElementById('fileNumber').focus = true;
    }else if(!validateCombinationOfNumberAndAlphabet(applicantFileNumber)){
        message = message + "<a href='#fileNumber'>Sorry! Combination of alphabet and number is required in file number </a><br>";
        document.getElementById('fileNumber').focus = true;
    }else if(!validateStartWithNumber(applicantFileNumber)){
        message = message + "<a href='#fileNumber'>Sorry! file number must start with alphabet in file number </a><br>";
        document.getElementById('fileNumber').focus = true;
    }else{
        message = message + validateLastTwoDigits(applicantFileNumber);
        document.getElementById('fileNumber').focus = true;
    }
}

const validateLength = (input) => {
    if(input.length !== 12){
        return false;
    }
    return true;
}

const validateSpecialCharacter = (input) =>{
    let regex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/; //at the beginning and end: Delimiters to define the regular expression pattern.
                                                        //+: Quantifier that matches one or more occurrences of the characters within the character class.
    if (regex.test(input)) {
        return false;
    }
    return true;
}

const validateCombinationOfNumberAndAlphabet = (input) => {
   // let regex1 = /^[a-zA-Z0-9]+$/;  // ^ and $ ensures that the pattern matches till last from start and + for multiple number or alphabets are allowed
    let regex2 = /^[a-zA-Z]+$/;
    let regex3 = /^[0-9]+$/;
    if(regex2.test(input) || regex3.test(input)){
        return false;
    }
    return true;
}

const validateStartWithNumber = (input) =>{
    let regex = /^[0-9]+[a-zA-Z]+$/;

    if(regex.test(input)){
        return false;
    }
    return true;
}

const validateLastTwoDigits = (applicantFileNumber) =>{
    let regex = /\D\d{2}$/; // /\D/ matches any non-digit character.
                             // \d{2} matches exactly two digit characters (0-9).
    if (regex.test(applicantFileNumber)) {
        return "Last two digits are not numbers";
    }

    var dateInput = document.getElementById('date-of-issue').value;
    var selectedDate = new Date(dateInput);
    var year = (selectedDate.getFullYear()) % 100;
    // var year = 23; for demo
    var fileNumberLastTwoDigits = applicantFileNumber.slice(-2);
    if(fileNumberLastTwoDigits != year){
        return "Sorry! last 2 digits of file number does not match with year of issue";
    }
    return "";
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                            //2222222222222222222222222222222222222222222222
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//validate applicant's name field 2.1
function validateApplicantName_TC_SR_008(){
    var applicant = document.getElementById('applicantName').value;
    if(!applicant){
        message = message + "<a href='#applicantName'>The field of  applicant name should not be empty in  section 2.1</a><br>";
        document.getElementById('applicantName').focus = true;
    }else if(!validateSpecialCharacter(applicant)){
        message = message + "<a href='#applicantName'>The applicant name must not contain any special character in  section 2.1</a><br>";
        document.getElementById('applicantName').focus = true;
    }else if(!validateOnlyAlphabets(applicant)){
        message = message + "<a href='#applicantName'>The applicant name must contain only alphabets and no digits or other character in  section 2.1</a><br>";
        document.getElementById('applicantName').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//check if input value is made up of only alphabets or not. 
const validateOnlyAlphabets = (inputValue) => {
    let regex = /^[a-zA-Z]+$/;
    if(regex.test(inputValue)){
        return true;
    }
    return false;
}

//make required field 2.2
function validateAliases(){
    let alias_option = document.querySelector("input[type='radio'][name='alias']:checked");
    if(!alias_option){
        message = message + "<a href='#aliases'>Please select one option for your alias name in  section 2.2</a><br>";
        document.getElementById('aliases').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.3
function validateChangedName(){
    let name_change_option = document.querySelector("input[type='radio'][name='name_change']:checked");
    if(!name_change_option){
        message = message + "<a href='#changed_name'>Please select one option whether you have changed name or not? in  section 2.3</a><br>";
        document.getElementById('changed_name').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.4
function validateDateOfBirth(){
    let date_of_birth_option = document.querySelector("input[type='radio'][name='dob']:checked");
    if(!date_of_birth_option){
        message = message + "<a href='#date-of-birth'>Please enter your date of birth in  section 2.4</a><br>";
        document.getElementById('date-of-birth').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//validate place of birth TC_AD_2.5
function validatePlaceOfBirth_TC_AD_2_5(){
    var city = document.getElementById('city').value;
    var district = document.getElementById('district').value;
    var state = document.getElementById('state').value;
    var country = document.getElementById('country').value;

    if(!city){
        message = message + "<a href='#city'>Please enter your city of place of birth in  section 2.5</a><br>";
        document.getElementById('city').focus = true; 
    }else if(!validateSpecialCharacter(city)){
        message = message + "<a href='#city'>Please do not enter any special character in city of place of birth in  section 2.5</a><br>";
        document.getElementById('city').focus = true; 
    }else if(!validateOnlyAlphabets(city)){
        message = message + "<a href='#city'>Please enter only alphabets in city of place of birth in section 2.5</a><br>";
        document.getElementById('city').focus = true; 
    }

    if(!district){
        message = message + "<a href='#district'>Please enter your district of place of birth in  section 2.5</a><br>";
        document.getElementById('district').focus = true; 
    }else if(!validateSpecialCharacter(district)){
        message = message + "<a href='#district'>Please do not enter any special character in district of place of birth in section 2.5</a><br>";
        document.getElementById('district').focus = true; 
    }else if(!validateOnlyAlphabets(district)){
        message = message + "<a href='#district'>Please enter only alphabets in district of place of birth in section 2.5</a><br>";
        document.getElementById('district').focus = true; 
    }

    if(!state){
        message = message + "<a href='#state'>Please enter your state of place of birth in  section 2.5</a><br>";
        document.getElementById('state').focus = true; 
    }else  if(!validateSpecialCharacter(state)){
        message = message + "<a href='#state'>Please do not enter any special character in state of place of birth in section 2.5</a><br>";
        document.getElementById('state').focus = true; 
    }else if(!validateOnlyAlphabets(state)){
        message = message + "<a href='#state'>Please enter only alphabets in state of place of birth in section 2.5</a><br>";
        document.getElementById('state').focus = true; 
    }

    if(!country){
        message = message + "<a href='#country'>Please enter your country of place of birth in  section 2.5</a><br>";
        document.getElementById('country').focus = true; 
    }else if(!validateSpecialCharacter(country)){
        message = message + "<a href='#country'>Please do not enter any special character in country of place of birth in  section 2.5</a><br>";
        document.getElementById('country').focus = true; 
    }else if(!validateOnlyAlphabets(country)){
        message = message + "<a href='#country'>Please enter only alphabets in country of place of birth in section 2.5</a><br>";
        document.getElementById('country').focus = true; 
    }else if(country.toUpperCase()!="INDIA" && country.toUpperCase()!="Undivided India"){
        message = message + "<a href='#country'>Please enter valid country and details of place of birth in section 2.5</a><br>";
        document.getElementById('country').focus = true; 
    }

    if(city==district && city==state && city==country){
        message = message + "<a href='#city'>Please enter valid place of birth in section 2.5</a><br>";
        document.getElementById('city').focus = true; 
    }
    document.getElementById('error').innerHTML = message;
}

//validate 2.10 voter id
function validateVoterId_TC_AD_2_10(){
    var voterId = document.getElementById('voter_id').value;
    if(!validateSpecialCharacter(voterId)){
        message = message + "<a href='#voter_id'>The voter id must not contain any special character in  section 2.13</a><br>";
        document.getElementById('voter_id').focus = true;
    }else if(!validateCombinationOfNumberAndAlphabet(voterId)){
        message = message + "<a href='#voter_id'>The voter id should contain combination of number and alphabets in  section 2.13</a><br>";
        document.getElementById('voter_id').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.6 employment type
function validateEmploymentType(){
    let employment = document.querySelector("input[type='radio'][name='employment']:checked");
    if(!employment){
        message = message + "<a href='#employment-type'>Please enter employment type in  section 2.6</a><br>";
        document.getElementById('employment-type').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//voter id in upper case
function convertToUppercase() {
    var field = document.getElementById("voter_id");
    field.value = field.value.toUpperCase();
}

//make required field 2.8
function validate_2_8(){
    let parent_employment= document.querySelector("input[type='radio'][name='parent-employment']:checked");
    if(!parent_employment){
        message = message + "<a href='#pe'>Please select one option for your parent's employment in  section 2.8</a><br>";
        document.getElementById('pe').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.9
function validate_2_9(){
    let gender_option = document.querySelector("input[type='radio'][name='gender']:checked");
    if(!gender_option){
        message = message + "<a href='#g'>Please select gender in  section 2.9</a><br>";
        document.getElementById('g').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.10
function validate_2_10(){
    let marital = document.querySelector("input[type='radio'][name='marital-status']:checked");
    if(!marital){
        message = message + "<a href='#ms'>Please select marital status in  section 2.10</a><br>";
        document.getElementById('ms').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.11
function validate_2_11(){
    let nationality_option = document.querySelector("input[type='radio'][name='nationality']:checked");
    if(!nationality_option){
        message = message + "<a href='#ns'>Please select your citizenship in  section 2.11</a><br>";
        document.getElementById('ns').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.15
function validate_2_15(){
    let qualification_option = document.querySelector("input[type='radio'][name='qualification']:checked");
    if(!qualification_option){
        message = message + "<a href='#qualification_option'>Please select your educational qualification in  section 2.15</a><br>";
        document.getElementById('qualification_option').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//make required field 2.16
function validate_2_16(){
    let ecr_options = document.querySelector("input[type='radio'][name='ecr']:checked");
    if(!ecr_options){
        message = message + "<a href='#ecr_option'>Please select ecr or non-ecr in section 2.16</a><br>";
    }
    document.getElementById('error').innerHTML = message;
}

//validate organization name
function validateOrganizationName_TC_AD_2_12(){
    var orgName = document.getElementById('org_name').value;
    if(orgName.length>60){
        message = message + "<a href='#org_name'>The organization name must not be more than 60 characters in  section 2.7</a><br>";
        document.getElementById('org_name').focus = true;
    }
    else if(!validateSpecialCharacter(orgName)){
        message = message + "<a href='#org_name'>The organization name must not contain any special character in  section 2.7</a><br>";
        document.getElementById('org_name').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//validate aadhar card number
function validateAadharNumber_TC_AD_2_17(){
    var aadhar_number = document.getElementById('aadhar_no').value;
    if(aadhar_number.length>12 ||aadhar_number.length<12 ){
        message = message + "<a href='#aadhar_no'>The Aadhar number must be equal to 12 characters in  section 2.14</a><br>";
        document.getElementById('aadhar_no').focus = true;
    }
    else if(!validateSpecialCharacter(aadhar_number)){
        message = message + "<a href='#aadhar_no'>The Aadhar number must not contain any special character in  section 2.14</a><br>";
        document.getElementById('aadhar_no').focus = true;
    }else if(!validateOnlyNumbers(aadhar_number)){
        message = message + "<a href='#aadhar_no'>The Aadhar number must not contain any alphabet in  section 2.14</a><br>";
        document.getElementById('aadhar_no').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//allow only number and no alphabets
function validateOnlyNumbers(input){
    var regex = /^[0-9]+$/;
    if(regex.test(input)){
        return true;
    }
    return false;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                        //333333333333333333333333333333333333333333333333333333333
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//TC_FD_3.1_1= function for validating 3.1, 3.2, 3.3, 3.4 about required field and only alphabets are allowed in name
function validateNames_TC_FD_3_1_1(){
   var father_name = document.getElementById('father-name').value;
   if(!father_name){
        message = message + "<a href='#father-name'>Please enter father's name in  section 3.1</a><br>";
   }else{
        var regex = /^[a-zA-Z]+$/ ; 
        if(!regex.test(father_name)){
            message = message + "<a href='#father-name'>Please enter father's name containing only alphabets in  section 3.1</a><br>";
        }
   }

   var mother_name = document.getElementById('mother-name').value;

   if(!mother_name){
        message = message + "<a href='#mother-name'>Please enter mother's name in  section 3.2</a><br>";
   }else{
        var regex = /^[a-zA-Z]+$/ ; 
        if(!regex.test(mother_name)){
            message = message + "<a href='#mother-name'>Please enter mother's name containing only alphabets in  section 3.2</a><br>";
        }
   }
  
  var guardian_name = document.getElementById('guardian-name').value;
  if(!guardian_name){
    message = message + "<a href='#guardian-name'>Please enter guardian's name in  section 3.3</a><br>";
  }else{
    var regex = /^[a-zA-Z]+$/ ; 
    if(!regex.test(guardian_name)){
        message = message + "<a href='#guardian-name'>Please enter guardian's name containing only alphabets in  section 3.3</a><br>";
    }
   }

   var spouse_name = document.getElementById('fileNumber').value;
   if(spouse_name){
        var regex = /^[a-zA-Z]+$/ ; 
        if(!regex.test(spouse_name)){
            message = message + "<a href='#fileNumber'>Please enter spouse's name containing only alphabets in  section 3.4</a><br>";
        }
   }
   document.getElementById('error').innerHTML = message;
}

//for validating father and mother's file number in section 3.5
function validateFileNumberOfParent_TC_FD_3_5_1(){
    let selected_value6 = document.querySelector("input[type='radio'][name='father-passport']:checked");
    let selected_value7 = document.querySelector("input[type='radio'][name='mother-passport']:checked");
    if(selected_value6){
        if(selected_value6.value == "file_number"){
            validateFathersFileNumber();
        }
    }
    if(selected_value7){
        if(selected_value7.value == "file_number"){
            validateMothersFileNumber();
        }
    }
}

//validate father's file number in section 3.5
function validateFathersFileNumber(){
    const applicantFileNumber = document.getElementById('father-detail').value;
    if(!applicantFileNumber){
        message = message + "<a href='#father-detail'>The field of  father's file number should not be empty in  section 3.5</a><br>";
        document.getElementById('father-detail').focus = true;
    }else if(!validateLength(applicantFileNumber)){
        message = message + "<a href='#father-detail'>The length of father's file number should be 12 characters in  section 3.5</a><br>";
        document.getElementById('father-detail').focus = true;
    }else if(!validateSpecialCharacter(applicantFileNumber)){
        message = message + "<a href='#father-detail'>Sorry! Special characters are not allowed in father's file number in  section 3.5</a><br>";
        document.getElementById('father-detail').focus = true;
    }else if(!validateCombinationOfNumberAndAlphabet(applicantFileNumber)){
        message = message + "<a href='#father-detail'>Sorry! Combination of alphabet and number is required in father's file number in  section 3.5</a><br>";
        document.getElementById('father-detail').focus = true;
    }else if(!validateStartWithNumber(applicantFileNumber)){
        message = message + "<a href='#father-detail'>Sorry! file number must start with alphabet in father's file number in  section 3.5</a><br>";
        document.getElementById('father-detail').focus = true;
    }else{
        message = message + validateLastTwoDigits(applicantFileNumber);
        document.getElementById('father-detail').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//validate mother's file number in section 3.5
function validateMothersFileNumber(){
    const applicantFileNumber = document.getElementById('mother-detail').value;
    if(!applicantFileNumber){
        message = message + "<a href='#mother-detail'>The field of  mother's file number should not be empty in  section 3.5</a><br>";
        document.getElementById('mother-detail').focus = true;
    }else if(!validateLength(applicantFileNumber)){
        message = message + "<a href='#mother-detail'>The length of mother's file number should be 12 characters in  section 3.5</a><br>";
        document.getElementById('mother-detail').focus = true;
    }else if(!validateSpecialCharacter(applicantFileNumber)){
        message = message + "<a href='#mother-detail'>Sorry! Special characters are not allowed in mother's file number in  section 3.5</a><br>";
        document.getElementById('mother-detail').focus = true;
    }else if(!validateCombinationOfNumberAndAlphabet(applicantFileNumber)){
        message = message + "<a href='#mother-detail'>Sorry! Combination of alphabet and number is required in mother's file number in  section 3.5</a><br>";
        document.getElementById('mother-detail').focus = true;
    }else if(!validateStartWithNumber(applicantFileNumber)){
        message = message + "<a href='#mother-detail'>Sorry! file number must start with alphabet in mother's file number in  section 3.5</a><br>";
        document.getElementById('mother-detail').focus = true;
    }else{
        message = message + validateLastTwoDigits(applicantFileNumber);
        document.getElementById('mother-detail').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    //4444444444444444444444444444444444444444444444444444444444444
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
function validateHouseNo_TC_PR_4_1_1(){
    let houseNoAndStreet = document.getElementById('houseAndStreet').value;
    if(houseNoAndStreet.length<10){
        message = message + "<a href='#houseAndStreet'>The house no. and street field should contain minimum 10 characters in section 4.1</a><br>";
        document.getElementById('houseAndStreet').focus = true;
    }else if(houseNoAndStreet.length>500){
        message = message + "<a href='#houseAndStreet'>The house no. and street field should contain maximum 500 characters in section 4.1</a><br>";
        document.getElementById('houseAndStreet').focus = true;
    }else if(allowOnlyFewSpecialChar(houseNoAndStreet)){
        message = message + "<a href='#houseAndStreet'>The house no. and street field should not contain special characters in section 4.1</a><br>";
        document.getElementById('houseAndStreet').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//validate village, police station and district
function validate_TC_PR_4_1_2(){
    let village = document.getElementById('villageId').value;
    let district = document.getElementById('districtId').value;
    let police_station = document.getElementById('policeStationId').value;
    if(!village){
        message = message + "<a href='#villageId'>The village should not be kept empty in section 4.1</a><br>";
        document.getElementById('villageId').focus = true;
    }else if(AllowOnlyAlphabetsAndFewSpecialChar(village)){
        message = message + "<a href='#villageId'>The village should not contain special characters or numbers in section 4.1</a><br>";
        document.getElementById('villageId').focus = true;
    }

    if(!district){
        message = message + "<a href='#districtId'>The district should not be kept empty in section 4.1</a><br>";
        document.getElementById('districtId').focus = true;
    }else if(AllowOnlyAlphabetsAndFewSpecialChar(district)){
        message = message + "<a href='#districtId'>The district should not be kept empty in section 4.1</a><br>";
        document.getElementById('districtId').focus = true;
    }

    if(!police_station){
        message = message + "<a href='#policeStationId'>The police station should not be kept empty in section 4.1</a><br>";
        document.getElementById('policeStationId').focus = true;
    }else if(AllowOnlyAlphabetsAndFewSpecialChar(police_station)){
        message = message + "<a href='#policeStationId'>The police station should not contain special characters or numbers in section 4.1</a><br>";
        document.getElementById('policeStationId').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//validate PIN code 
function validatePIN(){
    let pinNumber = document.getElementById('pin').value;
    if(!pinNumber){
        message = message + "<a href='#pin'>The pin code must not empty in  section 4.1</a><br>";
        document.getElementById('pin').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//validate Mobile number 
function validateMobileNo(){
    let mobileNumber = document.getElementById('m_no').value;
    if(!mobileNumber){
        message = message + "<a href='#m_no'>The mobileNumber must not empty in  section 4.1</a><br>";
        document.getElementById('m_no').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

//for allowing only .,- these special chars
function allowOnlyFewSpecialChar(input){
    let regex = /[!@#$%^&*()_+\=[\]{};':"\\|<>/?]+/; 
  
    if (regex.test(input)) {
        return true;
    }
    return false;
}

//For allowing only .,- and and alphabets only
function AllowOnlyAlphabetsAndFewSpecialChar(input){
    let regex = /[!@#$%^&*()_+\=[\]{};':"\\|<>/?0-9]+/; 
  
    if (regex.test(input)) {
        return true;
    }
    return false;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    //5555555555555555555555555555555555555555555555555555555555
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//disable section 5 if 4.2 is selected as NO
function validate_TC_EC_5_1(){
    let addrValue = document.querySelector("input[type='radio'][name='addr-check']:checked").value;
    let field1 = document.getElementById("nameAndAddress_5");
    let field2 = document.getElementById("mobileNo_5");
    let field3 = document.getElementById("telephone_5");
    let field4 = document.getElementById("email_5");

    if(addrValue=="Yes"){
        field1.disabled= true;
        field2.disabled= true;
        field3.disabled= true;
        field4.disabled= true;
    }else{
        field1.disabled= false;
        field2.disabled= false;
        field3.disabled= false;
        field4.disabled= false;   
     }
}

//validate name and addr field of emergency details
function validate_TC_EC_5_3(){
    let emergencyNameAndAddr =document.getElementById('nameAndAddress_5').value;
    if(allowOnlyFewSpecialChar(emergencyNameAndAddr)){
        message = message + "<a href='#nameAndAddress_5'>The name and address field should not contain special characters in section 5</a><br>";
        document.getElementById('nameAndAddress_5').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    //666666666666666666666666666666666666666666666666666666666666666
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//disabling section on fresh-passport
function validate_TC_PP_6_1_1_1(){
    let selected_value1 = document.querySelector("input[type='radio'][name='applying-for']:checked");
    let section_6_1 = document.getElementById('section6_1');
    let section_6_2 = document.getElementById('section6_2');
    let section_heading = document.getElementById('section_heading');
    if(selected_value1.value=="Fresh-Passport"){
        section_6_1.style.display = "none";
        section_6_2.style.display = "none";
        section_heading.style.backgroundColor = "grey";
    }else {
        section_6_1.style.display = "block";
        section_6_2.style.display = "block";
        section_heading.style.backgroundColor = "purple";
    }
}

//validate 8 chars in passport number
function validate_TC_PP_6_1_1_2(){
    let passportNumber = document.getElementById('passportNo').value;
    let section_6_1 = document.getElementById('section6_1');
    if(section_6_1.style.display != "none"){
        if(!passportNumber){
            message = message + "<a href='#passportNo'>The passport number field should not be empty in section 6</a><br>";
            document.getElementById('passportNo').focus = true;
        }else if(passportNumber.length!=8){
            message = message + "<a href='#passportNo'>The passport number should be of 8 characters in section 6</a><br>";
            document.getElementById('passportNo').focus = true;
        }else if(!validateSpecialCharacter(passportNumber)){
            message = message + "<a href='#passportNo'>The passport number should not contain any special character in section 6</a><br>";
            document.getElementById('passportNo').focus = true;
        }
    }
    document.getElementById('error').innerHTML = message;
}

//validation of issue date and expiry date
function validateDates_TC_PP_6_1_2_1(){
    let issue = document.getElementById('date-of-issue_6').value;
    let expiry = document.getElementById('date-of-expiry_6').value;
    const issueDate = new Date(issue);
    const expiryDate = new Date(expiry);
    const currentDate = new Date();

    let section_6_1 = document.getElementById('section6_1');
    if(section_6_1.style.display != "none"){
            if(!issue ){
                message = message + "<a href='#date-of-issue_6'>Issue date should not be empty should not be empty in section 6</a><br>";
                document.getElementById('date-of-issue_6').focus = true;
            }
            if(!expiry ){
                message = message + "<a href='#date-of-expiry_6'>Expiry date should not be empty should not be empty in section 6</a><br>";
                document.getElementById('date-of-expiry_6').focus = true;
            }
            if(currentDate < issueDate){
                message = message + "<a href='#date-of-issue_6'>Date of issue cannot be from future in section 6</a><br>";
                document.getElementById('date-of-issue_6').focus = true;
            }
            if(expiryDate < issueDate){
                message = message + "<a href='#date-of-expiry_6'>Date of expiry cannot be past issue date in section 6</a><br>";
                document.getElementById('date-of-expiry_6').focus = true;
            }
    }
    document.getElementById('error').innerHTML = message;
}

//validate place of issue
function validateIssuePlace_TC_PP_6_1_3_1(){
    let issue_place = document.getElementById('issue_place_6').value;
    let section_6_1 = document.getElementById('section6_1');
    if(section_6_1.style.display != "none"){
        if(!issue_place){
            message = message + "<a href='#issue_place_6'>The place of issue field cannot not be left empty in section 6</a><br>";
            document.getElementById('issue_place_6').focus = true;
        }else if(!validateSpecialCharacter(issue_place)){
            message = message + "<a href='#issue_place_6'>The place of issue field should not contain any special character in section 6</a><br>";
            document.getElementById('issue_place_6').focus = true;
        }else if(IsContainNumber(issue_place)){
            message = message + "<a href='#issue_place_6'>The place of issue field should not contain any number in section 6</a><br>";
            document.getElementById('issue_place_6').focus = true;
        }
    }
    document.getElementById('error').innerHTML = message;
}

//check if string contain any number
function IsContainNumber(input){
    let regex = /\d/; //matches any digit character
    if(regex.test(input)){
        return true;
    }
    return false;
}

//validate passport applied but never issued and called onClick event
function validate_TC_PP_6_2_2(){
    let checkIssued = document.querySelector("input[type='radio'][name='issued']:checked");

    let section_6_1 = document.getElementById('section6_1');
    if(section_6_1.style.display != "none"){
      if(checkIssued.value == "Yes"){
            document.getElementById('fileNumber_6').disabled = true;
            // document.getElementById('monthAndYear').disabled = true;            
            document.getElementById('officeName_6').disabled = true;

        }else {
            document.getElementById('fileNumber_6').disabled = false;
            // document.getElementById('monthAndYear').disabled = false;
            document.getElementById('officeName_6').disabled = false;
        }
    }
    document.getElementById('error').innerHTML = message;
}

//validate required
function validate_TC_PP_6_2_2_req(){
    let checkIssued = document.querySelector("input[type='radio'][name='issued']:checked");

    let section_6_1 = document.getElementById('section6_1');
    if(section_6_1.style.display != "none"){
        if(!checkIssued){
            message = message + "<a href='#section6_2'>Please select issued Yes or Not in section 6.2</a><br>";
            document.getElementById('section6_2').focus = true;
        }
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    //777777777777777777777777777777777777777777777777
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//make required field 7.1.1
function validateAlias7_1_1es(){
    let option1 = document.querySelector("input[type='radio'][name='other1']:checked");
    let option2 = document.querySelector("input[type='radio'][name='other2']:checked");
    let option3 = document.querySelector("input[type='radio'][name='other3']:checked");
    let option4 = document.querySelector("input[type='radio'][name='other4']:checked");
    let option2_1 = document.querySelector("input[type='radio'][name='other2.1']:checked");
    let option2_2 = document.querySelector("input[type='radio'][name='other2.2']:checked");
    let option2_3 = document.querySelector("input[type='radio'][name='other2.3']:checked");
    let option2_4 = document.querySelector("input[type='radio'][name='other2.4']:checked");
    let option3_1 = document.querySelector("input[type='radio'][name='other3.1']:checked");
    let option3_2 = document.querySelector("input[type='radio'][name='other3.2']:checked");
    let option3_3 = document.querySelector("input[type='radio'][name='other3.3']:checked");
    let option4_1 = document.querySelector("input[type='radio'][name='other4.1']:checked");
    let option4_2 = document.querySelector("input[type='radio'][name='other4.2']:checked");
    let option4_3 = document.querySelector("input[type='radio'][name='other4.3']:checked");
    let option5_1 = document.querySelector("input[type='radio'][name='other5.1']:checked");



    if(!option1)
    {
        message = message + "<a href='#7_1_1'>Please select one option  out of yes or no in section 7.1.1</a><br>";
    }
    if(!option2)
    {
        message = message + "<a href='#7_1_2'>Please select one option  out of yes or no in section 7.1.2</a><br>";
    }
    if(!option3)
    {
        message = message + "<a href='#7_1_3'>Please select one option  out of yes or no in section 7.1.3</a><br>";
    }
    if(!option4)
    {
        message = message + "<a href='#7_1_4'>Please select one option  out of yes or no in section 7.1.4</a><br>";
    }
    

    if(!option2_1)
    {
        message = message + "<a href='#7_2_1'>Please select one option  out of yes or no in section 7.2.1</a><br>";
    }

    if(!option2_2)
    {
        message = message + "<a href='#7_2_2'>Please select one option  out of yes or no in section 7.2.2</a><br>";
    }

    if(!option2_3)
    {
        message = message + "<a href='#7_2_3'>Please select one option  out of yes or no in section 7.2.3</a><br>";
    }

    if(!option2_4)
    {
        message = message + "<a href='#7_2_4'>Please select one option  out of yes or no in section 7.2.4</a><br>";
    }


    if(!option3_1)
    {
        message = message + "<a href='#7_3_1'>Please select one option  out of yes or no in section 7.3.1</a><br>";
    }
    if(!option3_2)
    {
        message = message + "<a href='#7_3_2'>Please select one option  out of yes or no in section 7.3.2</a><br>";
    }
    if(!option3_3)
    {
        message = message + "<a href='#7_3_3'>Please select one option  out of yes or no in section 7.3.3</a><br>";
    }
   

    if(!option4_1)
    {
        message = message + "<a href='#7_4_1'>Please select one option  out of yes or no in section 7.4.1</a><br>";
    }
    if(!option4_2)
    {
        message = message + "<a href='#7_4_2'>Please select one option  out of yes or no in section 7.4.2</a><br>";
    }
    if(!option4_3)
    {
        message = message + "<a href='#7_4_3'>Please select one option  out of yes or no in section 7.4.3</a><br>";
    }
    

    if(!option5_1)
    {
        message = message + "<a href='#7_5_1'>Please select one option  out of yes or no in section 7.5.1</a><br>";
    }

    document.getElementById('error').innerHTML = message;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                    //888888888888888888888888888888888888888888888888888
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------

//validate fees amount
function validateFees_TC_FD_8_1(){
    let fees = document.getElementById('fees_8').value;
    if(!fees){
        message = message + "<a href='#fees_8'>Please enter fees amount in section 8</a><br>";
        document.getElementById('fees_8').focus = true;
    }else if(!checkOnlyNumberAndDotOperator(fees)){
        message = message + "<a href='#fees_8'>Please enter valid amount in section 8</a><br>";
        document.getElementById('fees_8').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

function checkOnlyNumberAndDotOperator(input){
    let regex = /^[0-9]+(\.[0-9]+)?$/;
    if(regex.test(input)){
        return true;
    }
    return false;
}

//validate DD number
function validateFees_TC_FD_8_2(){
    let DD_Number = document.getElementById('dd_Number').value;
    if(!checkOnlyNumber(DD_Number)){ 
        message = message + "<a href='#p'>Please enter valid DD number in section 8</a><br>";
        document.getElementById('fees_8').focus = true;
    }
    document.getElementById('error').innerHTML = message;
}

function checkOnlyNumber(input){
    var regex = /^[0-9]+$/;
    if(regex.test(input)){
        return true;
    }
    return false;
}


