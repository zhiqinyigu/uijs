/* ui.min.js */
java -jar compiler.jar --js=../ui.js --js_output_file=ui.min.js

/* ui.nano.min.js */
java -jar compiler.jar --js=../ui.nano.js --js_output_file=ui.nano.min.js

/* plugin list */
java -jar compiler.jar --js=../ui.Dialog.js --js_output_file=ui.tmp.js
 --js=../ui.DatePicker.js
 --js=../ui.Dialog.js
 --js=../ui.DragDrop.js
 --js=../ui.DropMenu.js
 --js=../ui.Flash.js
 --js=../ui.Gotop.js
 --js=../ui.ImageDetail.js
 --js=../ui.Menu.js
 --js=../ui.PopupMenu.js
 --js=../ui.Resize.js
 --js=../ui.Select.js
 --js=../ui.SelectMulti.js
 --js=../ui.ShowBar.js
 --js=../ui.SortTable.js
 --js=../ui.Tip.js
 --js=../ui.TipBox.js
 --js=../ui.Topology.js

/* ui.all.min.js */
java -jar compiler.jar --js=../ui.js
 --js_output_file=ui.all.min.js
