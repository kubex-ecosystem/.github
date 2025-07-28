(()=>{var e={};e.id=746,e.ids=[746],e.modules={2502:e=>{"use strict";e.exports=import("prettier/plugins/html")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:e=>{"use strict";e.exports=require("crypto")},57075:e=>{"use strict";e.exports=require("node:stream")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},83505:e=>{"use strict";e.exports=import("prettier/standalone")},84297:e=>{"use strict";e.exports=require("async_hooks")},85612:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>C,routeModule:()=>T,serverHooks:()=>M,workAsyncStorage:()=>O,workUnitAsyncStorage:()=>I});var s={};r.r(s),r.d(s,{POST:()=>S});var n=r(96559),i=r(48088),o=r(37719),a=Object.defineProperty,l=Object.defineProperties,d=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,m=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))c.call(t,r)&&m(e,r,t[r]);if(u)for(var r of u(t))p.call(t,r)&&m(e,r,t[r]);return e},f=(e,t)=>l(e,d(t)),y=(e,t,r)=>new Promise((s,n)=>{var i=e=>{try{a(r.next(e))}catch(e){n(e)}},o=e=>{try{a(r.throw(e))}catch(e){n(e)}},a=e=>e.done?s(e.value):Promise.resolve(e.value).then(i,o);a((r=r.apply(e,t)).next())}),g=class{constructor(e){this.resend=e}create(e){return y(this,arguments,function*(e,t={}){return yield this.resend.post("/api-keys",e,t)})}list(){return y(this,null,function*(){return yield this.resend.get("/api-keys")})}remove(e){return y(this,null,function*(){return yield this.resend.delete(`/api-keys/${e}`)})}},b=class{constructor(e){this.resend=e}create(e){return y(this,arguments,function*(e,t={}){return yield this.resend.post("/audiences",e,t)})}list(){return y(this,null,function*(){return yield this.resend.get("/audiences")})}get(e){return y(this,null,function*(){return yield this.resend.get(`/audiences/${e}`)})}remove(e){return y(this,null,function*(){return yield this.resend.delete(`/audiences/${e}`)})}};function v(e){return{attachments:e.attachments,bcc:e.bcc,cc:e.cc,from:e.from,headers:e.headers,html:e.html,reply_to:e.replyTo,scheduled_at:e.scheduledAt,subject:e.subject,tags:e.tags,text:e.text,to:e.to}}var x=class{constructor(e){this.resend=e}send(e){return y(this,arguments,function*(e,t={}){return this.create(e,t)})}create(e){return y(this,arguments,function*(e,t={}){let s=[];for(let t of e){if(t.react){if(!this.renderAsync)try{let{renderAsync:e}=yield r.e(794).then(r.bind(r,3794));this.renderAsync=e}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}t.html=yield this.renderAsync(t.react),t.react=void 0}s.push(v(t))}return yield this.resend.post("/emails/batch",s,t)})}},w=class{constructor(e){this.resend=e}create(e){return y(this,arguments,function*(e,t={}){if(e.react){if(!this.renderAsync)try{let{renderAsync:e}=yield r.e(794).then(r.bind(r,3794));this.renderAsync=e}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}e.html=yield this.renderAsync(e.react)}return yield this.resend.post("/broadcasts",{name:e.name,audience_id:e.audienceId,preview_text:e.previewText,from:e.from,html:e.html,reply_to:e.replyTo,subject:e.subject,text:e.text},t)})}send(e,t){return y(this,null,function*(){return yield this.resend.post(`/broadcasts/${e}/send`,{scheduled_at:null==t?void 0:t.scheduledAt})})}list(){return y(this,null,function*(){return yield this.resend.get("/broadcasts")})}get(e){return y(this,null,function*(){return yield this.resend.get(`/broadcasts/${e}`)})}remove(e){return y(this,null,function*(){return yield this.resend.delete(`/broadcasts/${e}`)})}update(e,t){return y(this,null,function*(){return yield this.resend.patch(`/broadcasts/${e}`,{name:t.name,audience_id:t.audienceId,from:t.from,html:t.html,text:t.text,subject:t.subject,reply_to:t.replyTo,preview_text:t.previewText})})}},$=class{constructor(e){this.resend=e}create(e){return y(this,arguments,function*(e,t={}){return yield this.resend.post(`/audiences/${e.audienceId}/contacts`,{unsubscribed:e.unsubscribed,email:e.email,first_name:e.firstName,last_name:e.lastName},t)})}list(e){return y(this,null,function*(){return yield this.resend.get(`/audiences/${e.audienceId}/contacts`)})}get(e){return y(this,null,function*(){return e.id||e.email?yield this.resend.get(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}update(e){return y(this,null,function*(){return e.id||e.email?yield this.resend.patch(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`,{unsubscribed:e.unsubscribed,first_name:e.firstName,last_name:e.lastName}):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}remove(e){return y(this,null,function*(){return e.id||e.email?yield this.resend.delete(`/audiences/${e.audienceId}/contacts/${(null==e?void 0:e.email)?null==e?void 0:e.email:null==e?void 0:e.id}`):{data:null,error:{message:"Missing `id` or `email` field.",name:"missing_required_field"}}})}},j=class{constructor(e){this.resend=e}create(e){return y(this,arguments,function*(e,t={}){return yield this.resend.post("/domains",{name:e.name,region:e.region,custom_return_path:e.customReturnPath},t)})}list(){return y(this,null,function*(){return yield this.resend.get("/domains")})}get(e){return y(this,null,function*(){return yield this.resend.get(`/domains/${e}`)})}update(e){return y(this,null,function*(){return yield this.resend.patch(`/domains/${e.id}`,{click_tracking:e.clickTracking,open_tracking:e.openTracking,tls:e.tls})})}remove(e){return y(this,null,function*(){return yield this.resend.delete(`/domains/${e}`)})}verify(e){return y(this,null,function*(){return yield this.resend.post(`/domains/${e}/verify`)})}},E=class{constructor(e){this.resend=e}send(e){return y(this,arguments,function*(e,t={}){return this.create(e,t)})}create(e){return y(this,arguments,function*(e,t={}){if(e.react){if(!this.renderAsync)try{let{renderAsync:e}=yield r.e(794).then(r.bind(r,3794));this.renderAsync=e}catch(e){throw Error("Failed to render React component. Make sure to install `@react-email/render`")}e.html=yield this.renderAsync(e.react)}return yield this.resend.post("/emails",v(e),t)})}get(e){return y(this,null,function*(){return yield this.resend.get(`/emails/${e}`)})}update(e){return y(this,null,function*(){return yield this.resend.patch(`/emails/${e.id}`,{scheduled_at:e.scheduledAt})})}cancel(e){return y(this,null,function*(){return yield this.resend.post(`/emails/${e}/cancel`)})}},k="undefined"!=typeof process&&process.env&&process.env.RESEND_BASE_URL||"https://api.resend.com",_="undefined"!=typeof process&&process.env&&process.env.RESEND_USER_AGENT||"resend-node:4.7.0",R=class{constructor(e){if(this.key=e,this.apiKeys=new g(this),this.audiences=new b(this),this.batch=new x(this),this.broadcasts=new w(this),this.contacts=new $(this),this.domains=new j(this),this.emails=new E(this),!e&&("undefined"!=typeof process&&process.env&&(this.key=process.env.RESEND_API_KEY),!this.key))throw Error('Missing API key. Pass it to the constructor `new Resend("re_123")`');this.headers=new Headers({Authorization:`Bearer ${this.key}`,"User-Agent":_,"Content-Type":"application/json"})}fetchRequest(e){return y(this,arguments,function*(e,t={}){try{let r=yield fetch(`${k}${e}`,t);if(!r.ok)try{let e=yield r.text();return{data:null,error:JSON.parse(e)}}catch(t){if(t instanceof SyntaxError)return{data:null,error:{name:"application_error",message:"Internal server error. We are unable to process your request right now, please try again later."}};let e={message:r.statusText,name:"application_error"};if(t instanceof Error)return{data:null,error:f(h({},e),{message:t.message})};return{data:null,error:e}}return{data:yield r.json(),error:null}}catch(e){return{data:null,error:{name:"application_error",message:"Unable to fetch data. The request could not be resolved."}}}})}post(e,t){return y(this,arguments,function*(e,t,r={}){let s=new Headers(this.headers);r.idempotencyKey&&s.set("Idempotency-Key",r.idempotencyKey);let n=h({method:"POST",headers:s,body:JSON.stringify(t)},r);return this.fetchRequest(e,n)})}get(e){return y(this,arguments,function*(e,t={}){let r=h({method:"GET",headers:this.headers},t);return this.fetchRequest(e,r)})}put(e,t){return y(this,arguments,function*(e,t,r={}){let s=h({method:"PUT",headers:this.headers,body:JSON.stringify(t)},r);return this.fetchRequest(e,s)})}patch(e,t){return y(this,arguments,function*(e,t,r={}){let s=h({method:"PATCH",headers:this.headers,body:JSON.stringify(t)},r);return this.fetchRequest(e,s)})}delete(e,t){return y(this,null,function*(){let r={method:"DELETE",headers:this.headers,body:JSON.stringify(t)};return this.fetchRequest(e,r)})}},A=r(32190);let N=process.env.RESEND_API_KEY,P=N?new R(N):null,q={en:{validation:{allFieldsRequired:"All fields are required.",invalidEmail:"Please enter a valid email address."},responses:{success:"Message sent successfully! I'll get back to you soon.",error:"Error sending message. Please try again.",serverError:"Internal server error."},emailSubjects:{newContact:"[Portfolio] New Contact",thankYou:"Thank you for contacting me!"},emailContent:{newContactHtml:e=>`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New message from portfolio
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${e.name}</p>
            <p><strong>Email:</strong> ${e.email}</p>
            <p><strong>Subject:</strong> ${e.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${e.message.replace(/\n/g,"<br>")}
            </div>
          </div>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            This message was sent through your portfolio contact form.
          </p>
        </div>
      `,thankYouHtml:e=>`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank you for contacting me, ${e.name}!
          </h2>
          
          <p>I received your message and typically respond within 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your message:</h3>
            <p><strong>Subject:</strong> ${e.subject}</p>
            <div style="border-left: 4px solid #007bff; padding-left: 15px; color: #666;">
              ${e.message.replace(/\n/g,"<br>")}
            </div>
          </div>
          
          <p>Best regards,<br>
          <strong>Rafael Mori</strong></p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            You can reply directly to this email if you need to add more information.
          </p>
        </div>
      `}},pt:{validation:{allFieldsRequired:"Todos os campos s\xe3o obrigat\xf3rios.",invalidEmail:"Por favor, insira um email v\xe1lido."},responses:{success:"Mensagem enviada com sucesso! Responderei em breve.",error:"Erro ao enviar mensagem. Tente novamente.",serverError:"Erro interno do servidor."},emailSubjects:{newContact:"[Portfolio] Novo Contato",thankYou:"Obrigado pelo contato!"},emailContent:{newContactHtml:e=>`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nova mensagem do portf\xf3lio
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Nome:</strong> ${e.name}</p>
            <p><strong>Email:</strong> ${e.email}</p>
            <p><strong>Assunto:</strong> ${e.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Mensagem:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${e.message.replace(/\n/g,"<br>")}
            </div>
          </div>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            Esta mensagem foi enviada atrav\xe9s do formul\xe1rio de contato do seu portf\xf3lio.
          </p>
        </div>
      `,thankYouHtml:e=>`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Obrigado pelo contato, ${e.name}!
          </h2>
          
          <p>Recebi sua mensagem e respondo normalmente em at\xe9 24 horas.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Sua mensagem:</h3>
            <p><strong>Assunto:</strong> ${e.subject}</p>
            <div style="border-left: 4px solid #007bff; padding-left: 15px; color: #666;">
              ${e.message.replace(/\n/g,"<br>")}
            </div>
          </div>
          
          <p>Atenciosamente,<br>
          <strong>Rafael Mori</strong></p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            Voc\xea pode responder diretamente a este email se precisar adicionar mais informa\xe7\xf5es.
          </p>
        </div>
      `}}};async function S(e){try{if(!P)return A.NextResponse.json({success:!1,message:"Email service not configured"},{status:500});let t=await e.json(),r=t.language||"en",s=q[r];if(!t.name||!t.email||!t.subject||!t.message)return A.NextResponse.json({success:!1,message:s.validation.allFieldsRequired},{status:400});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email))return A.NextResponse.json({success:!1,message:s.validation.invalidEmail},{status:400});let{data:n,error:i}=await P.emails.send({from:"Portfolio Contact <noreply@rafa-mori.dev>",to:["faelmori@gmail.com"],subject:`${s.emailSubjects.newContact} - ${t.subject}`,html:s.emailContent.newContactHtml(t),text:`
        ${"pt"===r?"Nova mensagem do portf\xf3lio":"New message from portfolio"}

        ${"pt"===r?"Nome":"Name"}: ${t.name}
        Email: ${t.email}
        ${"pt"===r?"Assunto":"Subject"}: ${t.subject}

        ${"pt"===r?"Mensagem":"Message"}:
        ${t.message}
      `});if(i)return console.error("Erro ao enviar email:",i),A.NextResponse.json({success:!1,message:s.responses.error},{status:500});return await P.emails.send({from:"Rafael Mori <noreply@rafa-mori.dev>",to:[t.email],subject:s.emailSubjects.thankYou,html:s.emailContent.thankYouHtml(t)}),A.NextResponse.json({success:!0,message:s.responses.success},{status:200})}catch(e){return console.error("Erro na API de contato:",e),A.NextResponse.json({success:!1,message:q.en.responses.serverError},{status:500})}}let T=new n.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"/srv/apps/LIFE/RAFA-MORI/rafa-mori/src/app/api/contact/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:O,workUnitAsyncStorage:I,serverHooks:M}=T;function C(){return(0,o.patchFetch)({workAsyncStorage:O,workUnitAsyncStorage:I})}},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[447,580],()=>r(85612));module.exports=s})();