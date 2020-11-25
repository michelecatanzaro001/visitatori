@ECHO On
 

cd  ./visitor-man

cmd /c gulp clean 

cmd /c  gulp bundle --ship

cmd /c  gulp package-solution --ship

cmd /c gulp serve --nobrowser