<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  store,
  name: 'App'
}
</script>

<style>
html {
  background: #F1F1F1;
}

#app {
  min-height: 100vh;
  background: #F1F1F1;
}

.container {
  max-width: 480px !important;
}

.pointer {
  cursor: pointer;
}

.btn-width-fixed {
  width: 480px;
}

@media screen and (max-width: 480px) {
  .btn-width-fixed {
    width: 75%
  }
}

/* Customize  */
.bg-success, .btn-success, .badge-success {
  background: #4E9C81 !important;
  border-color: transparent !important;
}

.bg-primary, .btn-primary, .badge-primary {
  background: #72A3BC !important;
  border-color: transparent !important;
}

.bg-danger, .btn-danger {
  background: #ff6666 !important;
  border-color: transparent !important;
}

.btn-secondary {
  background: #C3C3C3 !important;
  border-color: transparent !important;
}

#headingrow {
  margin-right: 0px !important;
  margin-left: 0px !important;
}

#modal-information .modal-header {
  border-bottom: 0px !important;
}

#modal-history .modal-header {
  border-bottom: 0px !important;
}

#modal-history .modal-body {
  padding-top: 0px !important;
}

/* Upload Form */
.uploader {
  display: block;
  clear: both;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
}
.uploader label {
  float: left;
  clear: both;
  width: 100%;
  padding: 2rem 1.5rem;
  text-align: center;
  background: #fff;
  border-radius: 7px;
  border: 1.25px dashed #ced4da;
  transition: all 0.2s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.uploader label:hover {
  border-color: #c0c0c0;
}
.uploader label.hover {
  border: 3px solid #a0a0a0;
  box-shadow: inset 0 0 0 6px #eee;
}
.uploader label.hover #start i.fa {
  transform: scale(0.8);
  opacity: 0.3;
}
.uploader #start {
  float: left;
  clear: both;
  width: 100%;
}

.uploader #start i.fas {
  color: #E8E8E8;
  font-size: 40px;
  transition: all 0.2s ease-in-out;
}
.uploader #response {
  float: left;
  clear: both;
  width: 100%;
}
.uploader #response.hidden {
  display: none;
}
.uploader #response #messages {
  margin-bottom: 0.5rem;
}
.uploader #file-image {
  display: inline;
  margin: 0 auto 0 auto;
  width: auto;
  height: auto;
  max-width: 180px;
}

.uploader input[type="file"] {
  display: none;
}
.uploader div {
  margin: 0em;
  color: #5f6982;
}


</style>
