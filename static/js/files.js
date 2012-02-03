/**
 * 2011 Peter 'Pita' Martischka (Primary Technology Ltd)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
    
exports.init = function(){
  //set the upload iframe url
  $("#files iframe").attr("src",document.location.pathname + "/upload?" + clientVars.padId); 
  
  exports.listFiles();
}
 
exports.listFiles = function(){
  var files = clientVars.files;
  files.sort();
  
  //clear the filelist
  $("#filelist").empty();
  
  //clone the template
  var template = $("#files .filelistelement").clone()[0];
  $(template).css("display","block");
  var links = template.getElementsByTagName("a");
  
  //add all files to the filelist
  for(var i=0;i<files.length;i++){
    links[0].href = document.location.pathname + "/download/" + files[i]; 
    
    var fileName = files[i];
    
    //cut the filename if its too long
    if(fileName.length > 20){
      var fileEnding = "";
      var fileStart = fileName;
      
      //if there is a fileending, use it for better shorting
      var pointPosition = fileName.lastIndexOf(".");
      if(pointPosition !== -1){
        fileStart = fileName.substr(0,pointPosition);
        fileEnding = fileName.substr(pointPosition);
        
        fileStart = fileStart.substr(0,17-fileEnding.length);
      }
      
      fileName = fileStart.substr(0,17) + "..." + fileEnding;
    }
    
    //set the filename
    links[0].firstChild.data = fileName;
 
    //set the delete link
    links[1].href = "javascript:require('/files').deleteFile('" + files[i] + "')"
 
    //append the template
    $("#filelist").append($(template).clone());
  }
  
}

exports.deleteFile = function(fileName){
  var pad = require('/pad2').pad;
  pad.collabClient.sendMessage({type:"DELETE_FILE", file:fileName});
}
