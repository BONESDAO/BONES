document.addEventListener("DOMContentLoaded",function(){const ranking=document.querySelector(".ranking");const personal=document.querySelector(".personal");const avatar1=document.querySelector("#avatar1");const box22=document.querySelector(".box2-2");const drum=document.querySelector("#drum");const num1=document.querySelector("#num1");const progress=document.querySelector(".progress");const Level=document.querySelector("#Level");const up=document.querySelector("#up");const points=document.querySelector("#points");const uname=document.querySelector("#uname");const box3=document.querySelector(".box3");const box1=document.querySelector(".box1");const rewardnum=document.querySelector("#rewardnum");const task=document.querySelector(".box2-1");let code;let isUpdating=false;let nowexp;let allExp;let timeid;let addExp=0;if(addExp===null||addExp===undefined){addExp=0;}
let nextLevel;let flag=false;let uboneid;let attack;const tg=window.Telegram.WebApp;const user=tg.initDataUnsafe.user;const id=user.id;let username=user.username;if(username==undefined){username=user.first_name;}else if(user.first_name==undefined){username=user.last_name;}
const url=new URL(window.location.href);const startappParam=url.searchParams.get('tgWebAppStartParam');fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id,username:username,uacceptcode:startappParam})}).then(response=>response.json()).then(data=>{uboneid=data.results.uboneid;nowexp=data.results.uexp;uname.textContent=data.results.uname;points.textContent=data.results.skull.toLocaleString();Level.textContent=data.results.ulevel;nextLevel=data.results.ulevel+1;fetch("/api/game/getNextLevelExp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nextLevel:nextLevel})}).then(response=>response.json()).then(data=>{allExp=data.dneedexp;progress.style.width=(nowexp/allExp)*100+"%";}).catch(error=>{})
fetch("/api/game/getAttack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uboneid:uboneid})}).then(response=>response.json()).then(data=>{attack=data.attack;})
fetch("/api/game/getRewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id})}).then(response=>response.json()).then(data=>{data.rewards.forEach(element=>{const item=document.createElement("div");item.classList.add('item');if(element.RewardType==1){item.innerHTML=`
                    <div class="left">
                        <div class="bkgd">
                            <img src="../images/register.png" alt="" class="rewardicon">
                        </div>
                        <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                    </div>
                    <div class="right">
                        <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                        <img src="../images/2.png" alt="" id="icon">
                    </div>
                    `
box1.appendChild(item);}else if(element.RewardType==2){item.innerHTML=`
                    <div class="left">
                        <div class="bkgd">
                            <img src="../images/share.png" alt="" class="rewardicon">
                        </div>
                        <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                    </div>
                    <div class="right">
                        <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                        <img src="../images/2.png" alt="" id="icon">
                    </div>
                    `
box1.appendChild(item);}else if(element.RewardType==3){item.innerHTML=`
                    <div class="left">
                        <div class="bkgd">
                            <img src="../images/up.png" alt="" class="rewardicon">
                        </div>
                        <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                    </div>
                    <div class="right">
                        <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                        <img src="../images/2.png" alt="" id="icon">
                    </div>
                    `
box1.appendChild(item);}else if(element.RewardType==4){item.innerHTML=`
                    <div class="left">
                        <div class="bkgd">
                            <img src="../images/task.png" alt="" class="rewardicon">
                        </div>
                        <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                    </div>
                    <div class="right">
                        <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                        <img src="../images/2.png" alt="" id="icon">
                    </div>
                    `
box1.appendChild(item);}})}).catch(error=>{})}).catch(error=>{console.error("Error:",error);});box22.addEventListener("click",function(event){drum.src="../images/1.png"
const plusOne=document.createElement("div");plusOne.textContent=`+${attack}`;plusOne.className="plus-one";plusOne.style.left=`${44}px`;plusOne.style.top=`${300}px`;document.querySelector(".container").appendChild(plusOne);plusOne.addEventListener("animationend",()=>{plusOne.remove();});nowexp+=attack;progress.style.width=(nowexp/allExp)*100+"%";if(nowexp>allExp){nowexp=allExp;flag=true;up.style.display="block";box3.style.height="7.5%";}else if(nowexp==allExp){flag=true;addExp+=attack;up.style.display="block";box3.style.height="7.5%";}else{addExp+=attack;}
setTimeout(function(){drum.src="../images/2.png"},100);});timeid=setInterval(function(){if(isUpdating)return;isUpdating=true;fetch("/api/game/updateExp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id,exp:addExp})}).then(response=>response.json()).then(data=>{addExp=0;}).catch(error=>{}).finally(()=>{isUpdating=false;});if(flag){}},3000);up.addEventListener("click",function(){if(flag){Level.textContent=nextLevel;flag=false;up.style.display="none";box3.style.height="0%";prompt.style.display="block";container.style.display="none";fetch("/api/game/upLevel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id,dlevel:nextLevel})}).then(response=>response.json()).then(data=>{rewardnum.innerHTML=data.skull
fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id,username:username,uacceptcode:startappParam})}).then(response=>response.json()).then(data=>{uboneid=data.results.uboneid;nowexp=data.results.uexp;uname.textContent=data.results.uname;points.textContent=data.results.skull.toLocaleString();Level.textContent=data.results.ulevel;nextLevel=data.results.ulevel+1;fetch("/api/game/getNextLevelExp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nextLevel:nextLevel})}).then(response=>response.json()).then(data=>{allExp=data.dneedexp;progress.style.width=(nowexp/allExp)*100+"%";}).catch(error=>{})
fetch("/api/game/getAttack",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({uboneid:uboneid})}).then(response=>response.json()).then(data=>{attack=data.attack;})}).catch(error=>{console.error("Error:",error);});fetch("/api/game/getRewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id})}).then(response=>response.json()).then(data=>{box1.innerHTML="";const name=document.createElement("div");name.classList.add('name');name.innerHTML=`
                    <span><b>Your Rewards</b></span>
                    `;box1.appendChild(name);data.rewards.forEach(element=>{const item=document.createElement("div");item.classList.add('item');if(element.RewardType==1){item.innerHTML=`
                            <div class="left">
                                <div class="bkgd">
                                    <img src="../images/register.png" alt="" class="rewardicon">
                                </div>
                                <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                            </div>
                            <div class="right">
                                <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                                <img src="../images/2.png" alt="" id="icon">
                            </div>
                            `
box1.appendChild(item);}else if(element.RewardType==2){item.innerHTML=`
                            <div class="left">
                                <div class="bkgd">
                                    <img src="../images/share.png" alt="" class="rewardicon">
                                </div>
                                <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                            </div>
                            <div class="right">
                                <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                                <img src="../images/2.png" alt="" id="icon">
                            </div>
                            `
box1.appendChild(item);}else if(element.RewardType==3){item.innerHTML=`
                            <div class="left">
                                <div class="bkgd">
                                    <img src="../images/up.png" alt="" class="rewardicon">
                                </div>
                                <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                            </div>
                            <div class="right">
                                <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                                <img src="../images/2.png" alt="" id="icon">
                            </div>
                            `
box1.appendChild(item);}})}).catch(error=>{})}).catch(error=>{})}});ranking.addEventListener("click",function(){window.location.href="rankings.html";});personal.addEventListener("click",function(){window.location.href="invitation.html";});task.addEventListener("click",function(){window.location.href="task.html";});const prompt=document.querySelector(".prompt");const container=document.querySelector(".container");const Claim=document.querySelector("#Claim");const Share=document.querySelector("#Share");Claim.addEventListener("click",function(){prompt.style.display="none";container.style.display="block";});Share.addEventListener("click",function(){fetch("/api/game/doubleUp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id,dlevel:nextLevel})}).then(response=>response.json()).then(data=>{fetch("/api/game/getRewards",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:id})}).then(response=>response.json()).then(data=>{fetch('/api/invite/checkInviteCode',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})}).then(response=>response.json()).then(data=>{if(data.success){code=data.inviteCode;}})
box1.innerHTML="";const name=document.createElement("div");name.classList.add('name');name.innerHTML=`
                <span><b>Your Rewards</b></span>
                `;box1.appendChild(name);data.rewards.forEach(element=>{const item=document.createElement("div");item.classList.add('item');if(element.RewardType==1){item.innerHTML=`
                        <div class="left">
                            <div class="bkgd">
                                <img src="../images/register.png" alt="" class="rewardicon">
                            </div>
                            <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                        </div>
                        <div class="right">
                            <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                            <img src="../images/2.png" alt="" id="icon">
                        </div>
                        `
box1.appendChild(item);}else if(element.RewardType==2){item.innerHTML=`
                        <div class="left">
                            <div class="bkgd">
                                <img src="../images/share.png" alt="" class="rewardicon">
                            </div>
                            <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                        </div>
                        <div class="right">
                            <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                            <img src="../images/2.png" alt="" id="icon">
                        </div>
                        `
box1.appendChild(item);}else if(element.RewardType==3){item.innerHTML=`
                        <div class="left">
                            <div class="bkgd">
                                <img src="../images/up.png" alt="" class="rewardicon">
                            </div>
                            <div class="rewardname"><span><b>${element.RewardEvent}</b></span></div>
                        </div>
                        <div class="right">
                            <div class="num"><span><b>+${element.RewardSkull.toLocaleString()}</b></span></div>
                            <img src="../images/2.png" alt="" id="icon">
                        </div>
                        `
box1.appendChild(item);}})}).catch(error=>{})
const botUsername='Bones_Gamebot';const shareUrl=`https://t.me/${botUsername}/bones?startapp=${code}`;const shareText=`Come take a look at this powerful application! Use my invitation code: ${code}`;const telegramShareUrl=`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;tg.openLink(telegramShareUrl);});prompt.style.display="none";container.style.display="block";});});