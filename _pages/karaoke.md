---
layout: page
title: Karaoke Catalog
description: Want to know what I got?
heading: Karaoke
permalink: /karaoke/
sitemap:
  lastmod: 2017-07-31
  changefreq: yearly
  priority: 0.3
---

<div class="row">
    <form id="trackSearchForm">
	    <div class="col-lg-12">
            <div class="form-group input-group">
                <span class="input-group-addon"><i class="fa fa-music" aria-hidden="true"></i></span>
                <input class="form-control" id="condition" name="condition" placeholder="to search enter the partial or full song title or artist name here and press enter" type="text" minlength="3" required/>
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit"><i class="fa fa-search" aria-hidden="true"></i> Search</button>
                </span>
            </div>
        </div>
    </form>
</div>
<div id="messages"></div>
<div class="row-fluid">
	<div class="span12">
		<table class="table table-bordered">
			<thead>
				<tr>
					<th>Artist</th>
					<th>Track</th>
				</tr>
			</thead>
			<tbody id="results">
			</tbody>
		</table>
	</div>
</div>