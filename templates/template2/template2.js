$('#display-picture').click(
    function () {
        $('#imgupload').trigger('click');
    });

$("#imgupload").change(function (event) {
    var input = document.getElementById("imgupload");
    DP = input.files[0];
    var fReader = new FileReader();
    fReader.readAsDataURL(DP);
    var img = document.getElementById("display-picture");
    fReader.onloadend = function (event) {
        img.src = event.target.result;
        USER_CV_DATA["display-picture"] = img.src
        LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA));
    }
    uploadToStorage(DP)
        .then((url) => {
            img.src = url;
            USER_CV_DATA["display-picture"] = img.src
            LOCAL_STORAGE.setDatainLocalStorage(LOCALSTORAGE_CVDATA_KEY, JSON.stringify(CV_JSON_DATA));
        })
});


var setContent = {
    template2: {
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
                let li = ` <li><label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable university">${educationDetail.university},</label>
                                <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable edu_duration">${educationDetail.course}</label>
                               <div id='course' contenteditable="true" class="cvmaker-editable course">Bachelors of Arts , Major in Education</div>
                                 <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                                   </li>`
                eduList.append(li)
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
                let div =


                    `<div class="col-12 p-3">
<h5><span id='company' contenteditable="true" class="cvmaker-editable organization font-weight-bold">${experienceDetails.organization},
</span></h5><span id='remove' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
<h5><span id='designation' contenteditable="true" class="cvmaker-editable designation">${experienceDetails.designation}</span></h5>   
<h6> <span id='work_duration' contenteditable="true" class="cvmaker-editable work_duration">${experienceDetails.work_duration}</span></h6>
<span id='add' onclick="addSubPoint(this)"><i class="fa fa-plus-circle noPrint" aria-hidden="true"></i></span>
                                    <ul id='work_details${idx}'>    
                                    </ul>
                            </div>`
                    ;
                experienceList.append(div);
                let ul = $(`ul#work_details${idx}`)
                experienceDetails.work_details.forEach(workDetail => {
                    let li = `<li contenteditable="true" class="cvmaker-editable work_detail">${workDetail}
                    <span id='remove-2' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                </li> `;
                    ul.append(li)
                })

            })
        }
    }

}
var DEFAULT_SNIPPETS = {

    SKILLS: `<li> <label contenteditable="true" class="cvmaker-editable skill">placerat vestibulum lectus mauris ultri placerat vestibulum lectus mauris ultri</label>
    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
              </li> `,
    EDUCATION: ` <li class="py-1" >
    <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable university">UNIVERSITY OF LOYOLA MOUNT,</label>
    <label contenteditable="true" class="mb-0 font-weight-bold cvmaker-editable edu_duration">2009</label>
    <div id='course' contenteditable="true" class="cvmaker-editable course">Bachelors of Arts , Major in Education</div>
    <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
                </li> `,

    EXPERIENCE: `  <div class="col-12 p-3">
    <h5><span id='company' contenteditable="true" class="cvmaker-editable organization font-weight-bold">Anytime Fitness,</span></h5>
    <span id='remove' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
    <h5><span id='designation' contenteditable="true" class="cvmaker-editable designation">Yoga Instructor</span></h5>


    <h6> <span id='work_duration' contenteditable="true" class="cvmaker-editable work_duration">2011-present</span></h6>
        <span id='add' onclick="addSubPoint(this)"><i class="fa fa-plus-circle noPrint" aria-hidden="true"></i></span>

        <ul id='work_details'>
            <li contenteditable="true" class="cvmaker-editable work_detail">rem ipsum dolor sit amet, consectetur rem ipsum dolor sit amet, consectetur
                <span id='remove-1' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>

            </li>
            <li contenteditable="true" class="cvmaker-editable work_detail">placerat vestibulum lectus mauris ultri placerat vestibulum lectus mauris
                ultri
                <span id='remove-2' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
            </li>
            <li contenteditable="true" class="cvmaker-editable work_detail">placerat vestibulum lectus mauris ultri placerat vestibulum lectus mauris
                ultri
                <span id='remove-2' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
            </li>
            <li contenteditable="true" class="cvmaker-editable work_detail">placerat vestibulum lectus mauris ultri placerat vestibulum lectus mauris
                ultri
                <span id='remove-2' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
            </li>
        </ul>
</div>`,
    WORK_DETAILS: `  <li contenteditable="true" class="cvmaker-editable work_detail">Maintained and oraganised numerous office files
                 <span id='remove-2' onclick='deletePoint(this)'><i class="fa fa-minus-circle noPrint" aria-hidden="true"></i></span>
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
        console.log(newRow);
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