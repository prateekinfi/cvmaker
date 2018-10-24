function loadLayout() {
    return new Promise((resolve, reject) => {
        let template = LOCAL_STORAGE.getTemplateId();
        if (template==="null" || template === "undefined") {
            template = "template5"
        }
        $("link[href*='template']").remove();
        $("script[src*='template']").remove();
        var templateCSS = document.createElement("link")
        templateCSS.setAttribute("rel", "stylesheet")
        templateCSS.setAttribute("type", "text/css")
        templateCSS.setAttribute("href", `./templates/${template}/${template}.css`)
        document.getElementsByTagName("head")[0].appendChild(templateCSS)  
        $.ajax({
            url: `./templates/${template}/${template}.html`,
            context: document.body,
            success: (response) => {
                $("#loadTemplate").html(response);
                $.getScript(`./templates/${template}/${template}.js`,()=>{
                    if($("#display-picture")[0] && (USER_CV_DATA["display-picture"]!=="" && USER_CV_DATA["display-picture"])){
                        $("#display-picture")[0].src = USER_CV_DATA["display-picture"];
                    }
                    resolve();
                })
               
            }
        });
    });

}

function addEventListeneronEditable() {

    $(".cvmaker-editable").on("input", function (event) {
        LOCAL_STORAGE.setDatainLocalStorage(DUMMY_DATA_EDIT_STATUS, false);
        if (USER_CV_DATA[event.target.id] !== undefined) {
            USER_CV_DATA[event.target.id] = event.target.innerHTML;
            LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA));
        } else {
            var eventParent = $(event.target).parent().parent();
            if (eventParent[0].id) {
                UPDATE_LOCAL_CVDATA[eventParent[0].id]();
            }
            else {
                UPDATE_LOCAL_CVDATA["experience"]();
            }

        }
    });
}



function populateData(data) {
    var template = LOCAL_STORAGE.getTemplateId();
    Object.keys(data).forEach(id => {
        let element = document.getElementById(id)
        if (element &&  setContent[template][id] ) {

            setContent[template][id](id, data[id])
        }
    });
     
}



var UPDATE_LOCAL_CVDATA = {
    skills: function () {
        let updatedSkills = []
        Array.from($("#skills").children()).forEach(skill => {
            updatedSkills.push(skill.firstChild.innerText)
        });
        USER_CV_DATA["skills"] = updatedSkills;
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
    },
    qualifications: function () {
        let updatedQualificationsArray = [];
        Array.from($("#qualifications").children()).forEach(qualification => {
            let updatedQualification = {};
            updatedQualification["year"] = $(qualification).find(".year")[0].innerText;
            updatedQualification["qualification_detail"] = $(qualification).find(".qualification_detail")[0].innerText;
            updatedQualificationsArray.push(updatedQualification)
        });
        USER_CV_DATA["qualifications"] = updatedQualificationsArray;
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
    },
    education: function () {
        let updatedEducationArray = [];
        Array.from($("#education").children()).forEach(edu => {
            let updatedEducation = {};
            updatedEducation["university"] = $(edu).find(".university")[0].innerText;
            updatedEducation["course"] = $(edu).find(".course")[0].innerText;
            updatedEducation["edu_duration"] = $(edu).find(".edu_duration")[0].innerText;
            updatedEducationArray.push(updatedEducation)
        });
        USER_CV_DATA["education"] = updatedEducationArray;
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
    },
    awards: function () {
        let updatedAwardsArray = [];
        Array.from($("#awards").children()).forEach(award => {
            let updatedAward = {};
            updatedAward["year"] = $(award).find(".year")[0].innerText;
            updatedAward["award_detail"] = $(award).find(".award_detail")[0].innerText;
            updatedAward["organization"] = $(award).find(".organization")[0].innerText;
            updatedAwardsArray.push(updatedAward);
        });
        USER_CV_DATA["awards"] = updatedAwardsArray;
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
    },
    experience: function () {
        let updatedExperienceArray = [];
        Array.from($("#experience").children()).forEach(exp => {
            let updatedExperience = {};
            let updatedWorkDetails = [];
            updatedExperience["designation"] = $(exp).find(".designation")[0].innerText;
            updatedExperience["organization"] = $(exp).find(".organization")[0].innerText;
            updatedExperience["work_duration"] = $(exp).find(".work_duration")[0].innerText;
            Array.from($(exp).find(".work_detail")).forEach(work_detail => {
                updatedWorkDetails.push(work_detail.innerText)

            })
            updatedExperience["work_details"] = updatedWorkDetails;
            updatedExperienceArray.push(updatedExperience)
        });
        USER_CV_DATA["experience"] = updatedExperienceArray;
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA))
    }
}

 
function printPdf() {
    $("#watermark").removeClass("d-print-block")
    window.print()
    $("#watermark").addClass("d-print-block")
}


