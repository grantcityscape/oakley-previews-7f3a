# Lions Gate Yachts v1.1.23 — PATCH
## Apply to v1.1.22 to produce v1.1.23

Base file: `lions-gate-yachts-v1.1.22.html` (repo `grantcityscape/oakley-previews-7f3a`, branch `main`, blob SHA-1 `6613322e1db6d627d664c4037e56dc72a6de963d`, 3,548,503 bytes).
Target file: `lions-gate-yachts-v1.1.23.html` — a NEW file alongside .22. Do NOT modify .22.

How to apply: copy .22 to .23, then apply each numbered edit below IN ORDER. Each FIND is a unique string in .22 (verify it occurs exactly once, except where noted). REPLACE it with the given text. For INSERT edits, add the given text at the stated anchor. After applying, the file must still be valid HTML/JS. No other changes.

Storage keys UNCHANGED: `lionsGateYachts.entries.v1`, `lionsGateYachts.social.v1`, `lionsGateYachts.theme.v1`. New keys added (allowed): `lionsGateYachts.opening.v1`, `lionsGateYachts.starthere.v1`.

---

### P1 — Title version
FIND: `<title>Lions Gate Yachts — Workspace v1.1.22</title>`
REPLACE: `<title>Lions Gate Yachts — Workspace v1.1.23</title>`

### P2 — About utility-bar version
FIND: `Version v1.1.22`
REPLACE: `Version v1.1.23`

### P3 — About version line (app name + version)
FIND: `<strong>Version: v1.1.22</strong>`
REPLACE: `<strong>Version: v1.1.23</strong>`

### P4 — Shared / alignment layer comments
FIND: `/* v20 (KÜL v1.11.21 / LG v1.1.22) — SHARED layer, identical in both apps.`
REPLACE: `/* v20 (KÜL v1.11.21 / LG v1.1.23) — SHARED layer, identical in both apps.`
Note: replace BOTH occurrences of this line.
FIND: `/* v21 (KUL v1.11.21 / LG v1.1.22) - ALIGNMENT layer, identical in both apps.`
REPLACE: `/* v21 (KUL v1.11.21 / LG v1.1.23) - ALIGNMENT layer, identical in both apps.`

### P5 — Font stacks (KÜL parity; embedded font files pending)
FIND: `--serif:Georgia,'Times New Roman',serif;`
REPLACE: `--serif:'Cormorant Garamond',Georgia,'Times New Roman',serif;`
FIND: `--sans:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;`
REPLACE: `--sans:'Jost',-apple-system,'Segoe UI',Roboto,Arial,sans-serif;`
Note: this names KÜL's fonts (Cormorant Garamond display, Jost text) in the stacks. The embedded woff2 font files are NOT in this file; they arrive with Claude's KÜL .23. Until then the stacks fall back to Georgia / system sans, so the visible type is unchanged. Font parity is flagged PENDING (see "Flagged for Claude").

### P6 — Splash: opening screen only on first open
FIND: `  window.dismissOpening=function(){if(gone){return;}gone=true;if(opening){opening.style.display='none';}};`
REPLACE: `  window.dismissOpening=function(){if(gone){return;}gone=true;if(opening){opening.style.display='none';}try{localStorage.setItem('lionsGateYachts.opening.v1','1');}catch(e){}};`
FIND: `  setTimeout(window.dismissOpening,6500);`
REPLACE: `  try{if(localStorage.getItem('lionsGateYachts.opening.v1')){window.dismissOpening();}else{setTimeout(window.dismissOpening,6500);}}catch(e){setTimeout(window.dismissOpening,6500);}`
Note: new key `lionsGateYachts.opening.v1`. First open shows the splash (auto-dismiss 6.5s, records the flag); every later load dismisses it at once, so the opening screen is for opening only, not on every load/navigation.

### P7 — Buyer A: both vessels show their photos
FIND: `function photoSrc(rec){if(!rec){return '';}if(rec.photoData){return rec.photoData;}if(rec.coverKey&&PHOTOS[rec.coverKey]){return PHOTOS[rec.coverKey];}return '';}`
REPLACE: `function photoSrc(rec){if(!rec){return '';}if(rec.photoData){return rec.photoData;}if(rec.coverKey&&PHOTOS[rec.coverKey]){return PHOTOS[rec.coverKey];}if(rec.id&&typeof SEEDCK!=='undefined'&&SEEDCK[rec.id]&&PHOTOS[SEEDCK[rec.id]]){return PHOTOS[SEEDCK[rec.id]];}return '';}`
Note: SEEDCK maps sv1 to v88, sv2 to vjea, sv3 to vhouse, sv4 to vc30, sv5 to vs35, sv6 to vc28. This guarantees every seed vessel shows its photo even if the stored record lost coverKey. Buyer A (sv5, sv1) now shows vs35 and v88 — no text-only vessels, and the client photo no longer falls back to a monogram placeholder in place of a vessel photo.

### P8 — Social: the Maxum post gets a real photo
FIND: `{id:'fb3',url:'https://www.facebook.com/lionsgateyachts',urlLabel:'View on Facebook',when:'Jan 2025',photo:'',likes:0,ccount:0,`
REPLACE: `{id:'fb3',url:'https://www.facebook.com/lionsgateyachts',urlLabel:'View on Facebook',when:'Jan 2025',photo:'fleet',likes:0,ccount:0,`
Note: 'fleet' is a real photograph from the business's own pages, already in the file's PHOTOS. The Maxum 3500SCR's own photograph is not in the file's asset set; the fleet photograph is the honest stand-in (the post is a for-sale post from the brokerage). No personal photos, no fake imagery. With a photo present, the R7-C4 designed tile no longer applies to this card.

### P9 — Social tabs actually filter
FIND: `  if(cols){cols.className='soc-cols soc-show-'+key;}`
REPLACE: `  if(cols){cols.className='soc-cols soc-show-'+key;}var _pf=document.getElementById('soc-panel-fb'),_pi=document.getElementById('soc-panel-ig');if(_pf){_pf.style.display=(key==='fb')?'':'none';}if(_pi){_pi.style.display=(key==='ig')?'':'none';}`
Note: keeps the class switch (CSS) and adds explicit panel display, so the tab filters even if the stylesheet rule is bypassed.

### P10 — Draft delete gets a confirmation (email + social)
FIND: `  window.deleteDraft=function(id){store.drafts=store.drafts.filter(function(d){return d.id!==id;});if(editingDraftId===id){cancelDraftEdit();}persist();renderEmail();};`
REPLACE: `  window.deleteDraft=function(id){if(!confirm('Delete this draft?')){return;}store.drafts=store.drafts.filter(function(d){return d.id!==id;});if(editingDraftId===id){cancelDraftEdit();}persist();renderEmail();};`
FIND: `window.deleteSocialDraft=function(id){socialStore.drafts=socialStore.drafts.filter(function(d){return d.id!==id;});persistSocial();renderSocialDrafts();};`
REPLACE: `window.deleteSocialDraft=function(id){if(!confirm('Delete this draft?')){return;}socialStore.drafts=socialStore.drafts.filter(function(d){return d.id!==id;});persistSocial();renderSocialDrafts();};`

### P11 — Weather motion: unmistakable, tasteful
FIND: `animation:wxdrift 26s linear infinite`
REPLACE: `animation:wxdrift 10s linear infinite`
FIND: `animation:wxwaves 5.5s linear infinite`
REPLACE: `animation:wxwaves 3s linear infinite`
FIND: `animation:wxbob 3.6s ease-in-out infinite`
REPLACE: `animation:wxbob 2.2s ease-in-out infinite`
FIND: `@keyframes wxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`
REPLACE: `@keyframes wxbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`
FIND: `radial-gradient(180px 42px at 18% 30%,rgba(255,255,255,.14),transparent 68%)`
REPLACE: `radial-gradient(180px 42px at 18% 30%,rgba(255,255,255,.20),transparent 68%)`
FIND: `radial-gradient(240px 56px at 62% 18%,rgba(255,255,255,.10),transparent 70%)`
REPLACE: `radial-gradient(240px 56px at 62% 18%,rgba(255,255,255,.16),transparent 70%)`
FIND: `radial-gradient(150px 36px at 84% 42%,rgba(255,255,255,.12),transparent 70%)`
REPLACE: `radial-gradient(150px 36px at 84% 42%,rgba(255,255,255,.18),transparent 70%)`
Note: faster cloud drift (26s to 10s), faster waves (5.5s to 3s), quicker and larger icon bob (3.6s / 4px to 2.2s / 7px), slightly stronger clouds. The reduced-motion rule is untouched (prefers-reduced-motion still disables the animation).

### P12 — Weather strip: honest label (not a live feed)
FIND: `.r6-wx-tag{display:none!important}`
REPLACE: `.r6-wx-tag{display:inline-block!important}`
FIND: `var tag=chip.querySelector('.r6-wx-tag'); if(tag)tag.remove();`
REPLACE: (delete both occurrences of this line entirely)
FIND: `tag.textContent='snapshot';`
REPLACE: `tag.textContent='snapshot — not live';`
Note: the weather chip now carries a small visible label "snapshot — not live", stating plainly that it is not a live feed.

### P13 — Suppress dashboard warnings driven by SAMPLE records
FIND: `var overdue=fu.filter(function(f){return !f.done&&f.due&&f.due<t;});`
REPLACE: `var overdue=fu.filter(function(f){return !f.done&&f.due&&f.due<t&&!f.sample;});`
FIND: `var fuDue=fu.filter(function(f){return !f.done&&f.due&&f.due>=t&&db17(t,f.due)<=7;}).length;`
REPLACE: `var fuDue=fu.filter(function(f){return !f.done&&f.due&&f.due>=t&&db17(t,f.due)<=7&&!f.sample;}).length;`
FIND: `var fuList2=overdue.concat(fuDue?fu.filter(function(f){return !f.done&&f.due&&f.due>=t&&db17(t,f.due)<=7;}):[]).slice(0,5);`
REPLACE: `var fuList2=overdue.concat(fuDue?fu.filter(function(f){return !f.done&&f.due&&f.due>=t&&db17(t,f.due)<=7&&!f.sample;}):[]).slice(0,5);`
Note: SAMPLE follow-ups stay in the follow-ups list, labelled SAMPLE. They no longer count as overdue, due-in-7-days, or appear in the Today follow-up list, so the dashboard no longer warns about sample data.

### P14 — Client count follows search/filter
INSERT the following line immediately BEFORE the line `var cl=document.getElementById('client-list');` (in renderClients, after the filtered `list` is computed):
`  var clc=document.getElementById('clients-count');if(clc){clc.textContent=list.length+(list.length===1?' client':' clients')+' · '+store.inquiries.filter(function(q){return q.status==='Open';}).length+' open inquiries';}`
Note: renderClients already sets clients-count at its start from the TOTAL (store.clients.length). This line runs after the filter and overwrites it with the filtered count (list.length), so the count follows search and filter. Do not remove the earlier line; the later one wins.

### P15 — Assistant: named in-app assistant "Burgee"
FIND: `<span class="ut">Assistant — Records Search</span>`
REPLACE: `<span class="ut">Assistant — Burgee</span>`
FIND: `<p class="vsub">Searches the records saved in this app — vessels, clients, engagements, inquiries, follow-ups, appointments and drafts — and nothing else.</p>`
REPLACE: `<p class="vsub">Burgee is the in-app assistant inside this workspace — not Tucker, your teammate. Burgee searches the records saved in this app — vessels, clients, engagements, inquiries, follow-ups, appointments and drafts — and nothing else.</p>`
Note: mirrors KÜL's Tucker pattern (named assistant, searches only the records in this workspace, not a channel to anyone outside). The name "Burgee" is the brand's own symbol (the opening screen is "Raising the Burgee") and is clearly not a person, so it cannot be confused with the real teammate Tucker. Claude to confirm or rename.

### P16 — Accounts wording: it records a choice, it does not sign in
FIND: `<p class="vsub">Link the business mailbox and calendar to this app, and look after the data this file holds.</p>`
REPLACE: `<p class="vsub">Link the business mailbox and calendar to this app, and look after the data this file holds. These settings record your choice — they do not sign you in.</p>`
FIND: `Account settings recorded locally. The live link activates in the full Canopy shell — nothing is synced from this file.`
REPLACE: `Account settings recorded locally — this records your choice; it does not sign you in. The live link activates in the full Canopy shell — nothing is synced from this file.`

### P17 — Start here card (first open only, dismissible)
INSERT the following block immediately BEFORE the line `<section class="view" id="view-today">`:

<div id="start-here" class="panel" hidden>
  <h2>Start here</h2>
  <p><strong>Mailbox of record:</strong> johnny@lionsgateyachts.com. Drafts are addressed from this mailbox until you link your own in Accounts.</p>
  <p><strong>Back up first:</strong> your records live only on this device, in this browser. Before you clear the sample records, use Accounts → Export JSON backup and save the file somewhere safe.</p>
  <p><strong>Add to your home screen:</strong> iPhone or iPad — in Safari, tap Share, then Add to Home Screen. Android — in Chrome, open the menu, then Add to Home screen.</p>
  <p><strong>Clear the samples:</strong> when you are ready, Accounts → Clear sample records removes the SAMPLE entries so the board is yours alone.</p>
  <p><button class="btn primary" onclick="dismissStartHere()">Got it — hide this card</button></p>
</div>
<script>
(function(){try{if(!localStorage.getItem('lionsGateYachts.starthere.v1')){var sh=document.getElementById('start-here');if(sh){sh.hidden=false;}}}catch(e){}})();
window.dismissStartHere=function(){var el=document.getElementById('start-here');if(el){el.style.display='none';}try{localStorage.setItem('lionsGateYachts.starthere.v1','1');}catch(e){}};
</script>

Note: new key `lionsGateYachts.starthere.v1`. The card sits above the Today view, shows on first open only, and hides for good once dismissed. Pick room is not applicable to Lions Gate. If the Accounts button labels differ from "Export JSON backup" / "Clear sample records", adjust the card wording to match them.

### P18 — About: support line
FIND (after P3 is applied): `<p class="note" style="margin-top:.8rem"><strong>Version: v1.1.23</strong> — Lions Gate Yachts Workspace.</p>`
REPLACE: `<p class="note" style="margin-top:.8rem"><strong>Version: v1.1.23</strong> — Lions Gate Yachts Workspace.</p><p class="note">Questions or problems — contact Grant, who sent you this app.</p>`
Note: apply P3 first; this find matches the post-P3 text.

### P19 — About font note (keep honest with P5)
FIND: `<p class="note">Type: headings are set in Georgia — the disclosed stand-in for the site's classic serif — with rounded geometric titles for the fleet, as on the site. No webfont is claimed where Georgia is used.</p>`
REPLACE: `<p class="note">Type: headings are set in Cormorant Garamond, the KÜL display serif, with Jost for body text — the same pair as KÜL — falling back to Georgia and the system sans until the font files are embedded. Rounded geometric titles for the fleet, as on the site.</p>`

### P20 — Canopy name (verified, no change)
Verified: the file uses "Canopy" / "Canopy shell" for the future shell throughout, and "Northbirch" and "Trellis" do not appear. No edit. New text in this patch also says "Canopy".

---

## Flagged for Claude (Design & Build Lead / Checker of Record)

- F1. Font parity: the embedded Cormorant Garamond + Jost woff2 files are not in this patch (they cannot be copied by this lane's tools). Claude to embed them from KÜL .23, or confirm the stacks + fallback are acceptable. Until then P5 names the fonts and the file falls back gracefully.
- F2. Today one-screen + identical Today structure: the Today (renderLgToday) renders 7 KPI tiles, 4 sections (overdue follow-ups, upcoming appointments, service targets within 14 days, service targets within 30 days) and 2 charts (fleet-by-status donut, GCI by stage). The one-screen restructure and the identical structure follow Claude's KÜL .23 — he sets the Today structure. This patch already removes the spurious sample-driven "Overdue follow-ups" content (P13) and adds the first-open Start here card (P17). Claude to confirm the Today restructure against KÜL .23.
- F3. Assistant name "Burgee" (P15): chosen by this lane; Claude to confirm or rename. It is labelled "in-app assistant" and distinguished from Tucker.
- F4. Social Maxum photo (P8): 'fleet' is the honest stand-in (the Maxum's own photo is not in the file's asset set). Claude to swap in the real Maxum photograph if he has it from the business's pages.
- F5. SHA-256: to be measured on the published .23 file by the hub (this lane could not produce the file directly — see "Why a patch").
- F6. Live nav badges: the badge-refresh already updates the counts on data change; verify in the .23 cold-use check that the rail badges follow live. No code change in this patch.

---

## Why a patch (not a live .23 URL)

The direct push failed in this browser. github.dev (VS Code web) cannot write the new file: every Save As attempt failed with "Unable to write file ... (InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase': The database connection is closing.)" — three attempts (before reload, after reload + re-authorization, after trusting the folder). The GitHub web editor cannot receive the 3.4 MB file content (no clipboard paste of that size). So this patch is the sanctioned analysis-route deliverable: the hub applies it to .22 to produce .23, commits it as `lions-gate-yachts-v1.1.23.html`, and publishes it. Expected .23 size: 3,548,503 bytes + the net patch delta (a few kilobytes; measure after applying). SHA-256 is measured by the hub on the published file.

---

## Verification checklist (after applying)

- Title, About utility bar, and About version line all read v1.1.23.
- First open shows the splash; reload does not. First open shows the Start here card; dismiss hides it; reload keeps it hidden.
- Buyer A file: both vessels (Custom Luxury 88′, Sailboat 35) show photos (no monogram placeholder, no text-only vessel).
- Social: the Maxum post (fb3, Jan 2025) shows a photo. Facebook / Instagram tabs filter the feed.
- Deleting an email draft or a social draft asks "Delete this draft?".
- Assistant view reads "Assistant — Burgee" with the in-app-assistant note.
- Weather moves clearly (clouds, waves, icon) and carries the "snapshot — not live" label.
- Today: no "Overdue follow-ups" driven by the SAMPLE follow-up; the follow-up tile does not count the sample.
- Clients: the count follows search / filter.
- Accounts: wording says the settings record a choice and do not sign in. About: version line + "Questions or problems — contact Grant, who sent you this app."
- Storage keys unchanged; Oakley memorial untouched; Johnny is a Yacht Broker (no owner/founder wording); Canopy is the only shell name.

— ChatGPT lane (Oakley), 2026-11-28. Claude checks this build before it counts toward 100%.
