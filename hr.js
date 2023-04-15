const puppeteer=require("puppeteer");
const codeObj=require("./hrcodes")
const loginLink="https://www.hackerrank.com/auth/login";
const email="xosokit285@wusehe.com";
const pass="123456";
let browserOpen=puppeteer.launch({
    headless:false,
    args:["--start-maximized"],
    defaultViewport:null
})
let page;
browserOpen.then(function(browserObj){
     let browserOpenPromise=browserObj.newPage();
     return browserOpenPromise;

}).then(function(newTab){
    page=newTab;
    let hackerrankopen=page.goto(loginLink);
    return hackerrankopen;
}).then(function(){
    let emailEntered=page.type("input[id='input-1']",email,{delay:50});
    return emailEntered;
}).then(function(){
    let passEntered=page.type("input[id='input-2']",pass,{delay:50});
    return passEntered;
}).then(function(){
    let buttonPress=page.click("button[data-analytics='LoginPassword']",{delay:50});
    return buttonPress;
})
.then(function(){
    let algorithmSelection=waitAndClick(".topic-card a[data-attr1='algorithms']",page);

    return algorithmSelection;
}).then(function(){
    let getToWarmUp=waitAndClick("input[value='warmup']",page);
    return getToWarmUp;

 }).then(function(){
     let waitFor3Seconds=page.waitFor(3000);
     return waitFor3Seconds;
 }).then(function(){
     let allChallengePromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50});
     return allChallengePromise;
 }).then(function(questionsArr){
     console.log(questionsArr.length)
     let quesWillBeSolved=questionSolver(page,questionsArr[0],codeObj.answers[0]);
     return quesWillBeSolved;


 })
 .catch(function(err){
  console.log(err);
})
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModel=cPage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })

}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let quesWillBeClicked=question.click();
        quesWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return EditorInFocusPromise;
        }).then(function(){
            return waitAndClick(".checkbox-input",page);
        }).then(function(){
            return page.waitForSelector("textarea.custominput");

        }).then(function(){
            return page.type("textarea.custominput",answer,{delay:10});

        }).then(function(){
            let ctrlIsPreses=page.keyboard.down("Control");
            return ctrlIsPreses;
        }).then(function(){
            let AisPresses=page.keyboard.press("A",{delay:100});
            return AisPresses;
        }).then(function(){
            let XisPresses=page.keyboard.press("X",{dealy:100});
            return XisPresses;
        }).then(function(){
            let ctrlIsUnPressed=page.keyboard.up("Control");
            return ctrlIsUnPressed;
        }).then(function(){
            let mainEditorInFocusPromise=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return mainEditorInFocusPromise;
        }).then(function(){
            let ctrlIsPreses=page.keyboard.down("Control");
            return ctrlIsPreses;
        }).then(function(){
            let AisPresses=page.keyboard.press("A",{delay:100});
            return AisPresses;
        }).then(function(){
            let AisPresses=page.keyboard.press("V",{delay:100});
            return AisPresses;

        }).then(function(){
            let ctrlIsUnPressed=page.keyboard.up("Control");
            return ctrlIsUnPressed;
        }).then(function(){
            return page.click(".hr-monaco__run-code",{delay:50});
        })
    
    })
}