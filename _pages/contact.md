--- 
layout: page 
title: Contact
description: Want to talk me? 
menu-header: Contact 
permalink: /contact/
sitemap:
  lastmod: 2017-07-31
  changefreq: yearly
  priority: 0.8
---

<p>Thank you for your interest. If you have any questions about the services provided or just feel like getting in touch,
    you can fill up the form below and hit "Send message".</p>
<div class="row">
    <div class="col-md-6">
        <form id="contactForm" class="contact-form">
            <div class="form-group input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
                <input class="form-control" id="name" name="name" placeholder="Your name *" type="text" minlength="2" required/>
            </div>
            <div class="form-group input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
                <input class="form-control" id="email" name="_replyto" placeholder="Your email * (will remain private)" type="email" required/>
            </div>
            <div class="form-group input-group">
                <span class="input-group-addon" id="basic-addon1" style="vertical-align:top;"><i class="fa fa-pencil"></i></span>
                <textarea class="form-control" id="message" name="message" placeholder="Your message *" rows="10" required></textarea>
            </div>
            <div class="form-group input-group">
                <span class="input-group-addon" id="basic-addon1"><i class="fa fa-pencil"></i></span>
                <input class="form-control" id="source" type="text" name="source" placeholder="How did you hear about my website?" />
            </div>
            <div class="form-group text-center">
                <input class="btn btn-default" type="reset" value="Reset">
                <button class="btn btn-primary" type="submit">
                    <i class='fa fa-envelope'></i> Send message 
                </button>
            </div>
        </form>
    </div>
    <div class="col-md-6">
        <div class="google-map" id="map" style="height:406px;"></div>
    </div>
</div>
<div class="row">
    <div class="col-md-12" id="messages"></div>
</div>
<hr/>
<h1>Got an idea?</h1>
<p>If you would like to, you could also directly contact me using any of the means below.</p>
<div class="row">
    <div class="col-sm-6 col-md-4">
        <div>
            <div class="caption" style="text-align:center;">
                <h3><i class="fa fa-envelope" aria-hidden="true"></i> Email</h3>
                <p><a href="mailto:{{ site.contact.email }}" target="_blank" rel="noopener">{{ site.contact.email }}</a></p>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-md-4">
        <div>
            <div class="caption" style="text-align:center;">
                <h3><i class="fa fa-map-marker" aria-hidden="true"></i> Address</h3>
                <p>{{ site.contact.address }}</p>
            </div>
        </div>
    </div>
    <div class="col-sm-6 col-md-4">
        <div>
            <div class="caption" style="text-align:center;">
                <h3><i class="fa fa-mobile" aria-hidden="true"></i> Phone</h3>
                <p>{{ site.contact.phone }}</p>
            </div>
        </div>
    </div>
</div>