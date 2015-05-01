# Bulletin Stack

#####www.bulletinstack.com

###Description
Bulletin Stack is a project organization site where users create virtual poster boards and organize tasks with ease through drag and drop.

###Features
* Create ***boards***
* Create ***lists*** within those boards
* Create ***cards*** within lists
* Create checklist ***items*** within cards
* Check completed ***items*** off
* Re-order ***lists***, ***cards***, and ***items*** by dragging and dropping them

###Technical Details
* Uses jQuery UI plugin to allow users to drag and drop lists, cards, and card items.
* Dragging and dropping models saves new order to database instantly through custom AJAX requests.
* Employs custom *CompositeView* class with recursive *#remove method* to eliminate zombie views.
* Custom css animation for modal forms.
