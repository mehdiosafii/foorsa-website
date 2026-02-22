(function(){
var s=sessionStorage,k='_fid',id=s.getItem(k);
if(!id){id='';for(var i=0;i<32;i++)id+='abcdefghijklmnopqrstuvwxyz0123456789'[Math.random()*36|0];s.setItem(k,id)}
var u=new URL(location.href);
function p(url,d){try{navigator.sendBeacon?navigator.sendBeacon(url,JSON.stringify(d)):fetch(url,{method:'POST',body:JSON.stringify(d),keepalive:true})}catch(e){}}
p('/api/track-visit',{
session_id:id,page_url:location.pathname,referrer:document.referrer||'',
utm_source:u.searchParams.get('utm_source')||'',utm_medium:u.searchParams.get('utm_medium')||'',
utm_campaign:u.searchParams.get('utm_campaign')||'',
screen_width:screen.width,screen_height:screen.height,language:navigator.language||'',
user_agent:navigator.userAgent
});
document.addEventListener('click',function(e){
var t=e.target.closest('.btn-apply-navbar,.cartoon-btn,.letsGo,.btn-submit,button[type="submit"],input[type="submit"]');
if(!t)return;
p('/api/track-click',{
session_id:id,page_url:location.pathname,
element_text:(t.textContent||'').trim().slice(0,100),
element_id:t.id||'',element_class:t.className||'',
element_href:t.href||t.closest('a')&&t.closest('a').href||'',
click_type:t.className.split(' ')[0]||'button'
});
});
})();
