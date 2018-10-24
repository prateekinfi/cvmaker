var setContent = {
    template5:{
        name: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        current_designation: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        about: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        address: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        phone_number: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        social_Link: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        email: function (id, value) {
            document.getElementById(id).innerHTML = value;
        },
        education: function (id, value) {
            let eduList = $(`#${id}`);
            value.forEach(educationDetail => {
                let li = `<li class="py-1">
                                <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable university">${educationDetail.university}</label ><label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable edu_duration">${educationDetail.edu_duration}</label></label>
                                    <div id='course' contenteditable="true" class="cvmaker-editable course">${educationDetail.course}</div>
                                    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                                </li>`;
                eduList.append(li)
            })
    
        },
        awards: function (id, value) {
            let awardsList = $(`#${id}`);
            value.forEach(awardDetail => {
                let li = `<li class="py-1">
                                   <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable award_detail">${awardDetail.award_detail}</label> <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable year" >${awardDetail.year}</label>
                                   <div id='organization' contenteditable="true" class="cvmaker-editable organization">${awardDetail.organization}</div>
                                   <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                               </li>`;
                awardsList.append(li)
            })
        },
        qualifications: function (id, value) {
            let qualificationsList = $(`#${id}`)
            value.forEach(qualificationDetail => {
                let div = `<div class="row p-2 pt-3">
                                    <div class="col-2 font-weight-bold cvmaker-editable year" contenteditable="true" >
                                        ${qualificationDetail.year}
                                    </div>
                                    <div class="col-10 cvmaker-editable qualification_detail" contenteditable="true" >
                                        ${qualificationDetail.qualification_detail}
                                    </div>
                                    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                                </div>`;
                qualificationsList.append(div)
            })
        },
        skills: function (id, value) {
            let skillsList = $(`#${id}`)
            value.forEach(skill => {
                let li = `<li><label contenteditable="true" class="cvmaker-editable skill">${skill}</label>
                                    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                                </li>`;
                skillsList.append(li)
            })
        },
        experience: function (id, value) {
            let experienceList = $(`#${id}`);
            value.forEach((experienceDetails, idx) => {
                let div = `<div class="col-12 col-lg-6 py-2">
                                    <h5><span id='designation' contenteditable="true" class="cvmaker-editable designation">${experienceDetails.designation}</span></h5>
                                    <span id='remove' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
        
                                    <h6><span id='company' contenteditable="true" class="cvmaker-editable organization">${experienceDetails.organization}</span><span id='duration' contenteditable="true" class="cvmaker-editable work_duration">(${experienceDetails.work_duration})</span></h6>
                                    <span id='add' onclick="addSubPoint(this)"><i class="fa fa-plus-circle noPrint" aria-hidden="true"></i></span>
                                    <ul id="work_details${idx}">
                                    </ul> 
                                </div>`;
                experienceList.append(div);
                let ul = $(`ul#work_details${idx}`)
                experienceDetails.work_details.forEach(workDetail => {
                    let li = `<li contenteditable="true" class="cvmaker-editable work_detail">${workDetail}
                                        <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
        
                                  </li>`;
                    ul.append(li)
                })
    
            })
        }
    }
    
}
var DEFAULT_SNIPPETS = {
    QUALIFICATIONS: `<div class="row p-2 pt-3">
                        <div class="col-2 font-weight-bold cvmaker-editable year" contenteditable="true">
                        2014
                        </div>
                        <div class="col-10 cvmaker-editable qualification_detail" contenteditable="true" >
                        Certified Personal Trainer
                        </div>
                        <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                    </div>`,
    SKILLS: `<li><label contenteditable="true" class="cvmaker-editable skill">css</label> 
                <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
            </li>`,
    EDUCATION: `<li class="py-1">
                    <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable university">UNIVERSITY OF LOYOLA MOUNT,</label> 
                    <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable edu_duration">2009</label>
                    <div id='course' contenteditable="true" class="cvmaker-editable course">Bachelors of Arts , Major in Education</div>
                    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                </li>`,
    AWARDS: `<li class="py-1">
                <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable award_detail" > BEST FITNESS TRAINER , </label>
                <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable year">2017</label>
                <div id='course' contenteditable="true" class="cvmaker-editable organization"> Anytime Fitness</div>
                <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
            </li>`,
    EXPERIENCE: `<div class="col-6">
                    <h5><span id='designation' contenteditable="true" class="cvmaker-editable designation">YOGA INSTRUCTOR</span></h5>
                    <span id='remove' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                    
                    <h6><span id='company' contenteditable="true" class="cvmaker-editable organization">Anytime Fitness</span><span id='work_duration' contenteditable="true" class="cvmaker-editable work_duration">(2011-present)</span></h6>
                    <span id='add' onclick="addSubPoint(this)"><i class="fa fa-plus-circle noPrint" aria-hidden="true"></i></span>
                    
                    <ul id='work_details'>
                        <li contenteditable="true" class="cvmaker-editable work_detail">rem ipsum dolor sit amet, consectetur rem ipsum dolor sit amet, consectetur
                        <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                        
                        </li>
                        <li contenteditable="true" class="cvmaker-editable work_detail">placerat vestibulum lectus mauris ultri placerat vestibulum lectus mauris ultri
                        <span id='remove-2' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                        </li>
                    </ul>
                </div>`,
    WORK_DETAILS: `<li contenteditable="true" class="cvmaker-editable work_detail">Maintained and oraganised numerous office files
                    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>  
                 </li>`
}

function addPoint(obj) {

    var str = obj.parentElement.className;
    var arr = str.split(' ');
    var category = arr[arr.length - 1].split('-')[0];
    selectCategory[category](`${category}-content`);

    // Adding Events
    addEventListeneronEditable();

    // Updating JSON
    UPDATE_LOCAL_CVDATA[category]();
}

function deletePoint(obj) {
    var category = obj.parentElement.parentElement.id;

    if (category.includes('work_details'))
        category = 'experience';

    var outerDiv = obj.parentElement.parentElement;
    outerDiv.removeChild(obj.parentElement);

    // Updating JSON
    UPDATE_LOCAL_CVDATA[category]();


}
function addSubPoint(obj) {

    var parent = obj.parentElement;
    var content = parent.lastElementChild.innerHTML;
    if (!parent.lastElementChild.firstElementChild) {
        var workdetail = DEFAULT_SNIPPETS.WORK_DETAILS;
    } else {
        var workdetail = parent.lastElementChild.firstElementChild.outerHTML;
    }
    parent.lastElementChild.innerHTML = content + workdetail;
    addEventListeneronEditable();
}


var selectCategory = {
    qualifications: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.QUALIFICATIONS;
        else
            var newRow = contentDiv.firstElementChild.outerHTML;
        document.getElementsByClassName(category)[0].innerHTML = contentDiv.innerHTML + '' + newRow;
    },
    skills: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild || !contentDiv.firstElementChild.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.SKILLS;
        else
            var newRow = contentDiv.firstElementChild.firstElementChild.outerHTML;

        document.getElementsByClassName(category)[0].firstElementChild.innerHTML = contentDiv.firstElementChild.innerHTML + '' + newRow;
    },
    awards: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild || !contentDiv.firstElementChild.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.AWARDS;
        else
            var newRow = contentDiv.firstElementChild.firstElementChild.outerHTML;

        document.getElementsByClassName(category)[0].firstElementChild.innerHTML = contentDiv.firstElementChild.innerHTML + '' + newRow;
    },
    education: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild || !contentDiv.firstElementChild.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.EDUCATION;
        else
            var newRow = contentDiv.firstElementChild.firstElementChild.outerHTML;

        document.getElementsByClassName(category)[0].firstElementChild.innerHTML = contentDiv.firstElementChild.innerHTML + '' + newRow;
    },
    experience: function (category) {
        var contentDiv = document.getElementsByClassName(category)[0];
        if (!contentDiv.firstElementChild)
            var newRow = DEFAULT_SNIPPETS.EXPERIENCE;
        else
            var newRow = contentDiv.firstElementChild.outerHTML;

        document.getElementsByClassName(category)[0].innerHTML = contentDiv.innerHTML + '' + newRow;
    }
}