---
layout: page
title: Portfolio & Services
description: What I do and offer!
menu-header: Portfolio
permalink: /portfolio/
sitemap:
  lastmod: 2017-07-31
  changefreq: yearly
  priority: 0.8
---

With a 15-year track record in the IT industry and a focus on achieving excellence in everything he does, Matt is now making a foray into the area of showbiz as well! He decided to take his passion for music and public speaking to the next level by making a paradigm shift to the entertainment industry in 2014 and hasn’t looked back ever since. 
 

## Voice-Over Artist

Matt’s rich, deep baritone is the perfect fit for television and radio promos, documentaries, powerful dramatic narrations, and corporate AV and audiobooks. His voice quality is crisp, clear and distinctive, making it  effective for subtle, intense reads, reporting and serious narrations. Additionally, his voice is very approachable, lending itself easily to a variety of characters. 
 
Services offered:
 * Radio and Television Promos
 * Documentaries
 * Narrations
 * Corporate AV
 * IVR
 * Audiobooks
 * E-Learning
 
## Karaoke Jockey

A regular, friendly face at Bangalore’s karaoke scene, Matt has combined his rich voice and presentation skills with his passion for music and singing by hosting karaoke nights at multiple venues in Bangalore. You can currently catch him every Wednesday nights at Boozers, Indiranagar 100ft Road.
 
Apart from a huge collection of karaoke tracks spread across various genres in English, Matt also  has an assortment of Bollywood karaoke tracks on offer. 
 
A few venues where Matt has previously hosted karaoke events include:
 * Xtreme Sports Bar, Bannerghatta Road
 * Xtreme Sports Bar, Indiranagar
 * White Elephant, 100ft Road, Indiranagar
 * The Palazzo, National Games Village
 * The United Sports Bar and Grill, Whitefield
 * Hokey Cokey, Koramangala
 * Harry’s Bar & Cafe, Indiranagar
 * Prost, Koramangala
 * Hard Rock Cafe, M G Road

Services offered:
 * Restaurants & Bars
 * Corporate Events
 * Private Parties

## Compère

Matt’s rich voice quality and presentation style brings in the perfect balance of fun, charm and seriousness to an event.
 
Services offered:
 * Celebrity Events/Concerts
 * Corporate Day Out
 * Game Shows
 * Award Ceremonies
 * Road Shows
 * Conferences and Seminars

## Novice Actor
During his spare time, Matt likes honing his acting skills in local theatre and short films. He recently played the character of Lord Montague in a production of William Shakespeare's Romeo and Juliet.

### Plays
<div class="panel panel-default">
    <div class="panel-heading">Credits</div>
    <table class="table table-striped table-bordered">
        <thead class="thead-inverse">
            <tr>
                <th>Year</th>
                <th>Title</th>
                <th>Role</th>
                <th>Playright</th>
                <th>Venue</th>
            </tr>
        </thead>
        <tbody>
        {% assign sorted_plays = site.data.plays | sort: 'year' | reverse %}
        {% for play in sorted_plays %}
            <tr>
                <td>{{ play.year }}</td>
                <td><a href="{{ play.production_website }}" alt="{{ play.production }}" target="_blank" rel="noopener">{{ play.production }}</a> - <a href="{{ play.play_website }}" alt="{{ play.title }}" target="blank" rel="noopener">{{ play.title }}</a></td>
                <td>{{ play.character }}</td>
                <td>{{ play.playwright }}</td>
                <td><a href="{{ play.venue_website }}" alt="{{ play.venue }}" target="_blank" rel="noopener">{{ play.venue }}</a></td>
            </tr>
        {% endfor %}
        </tbody>
    </table>
</div>