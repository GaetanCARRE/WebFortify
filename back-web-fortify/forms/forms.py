from bs4 import BeautifulSoup
from requests_html import HTMLSession
from pprint import pprint
import json

session = HTMLSession()

def get_all_forms(url, cookies=None):
    """Returns all form tags found on a web page's `url` """
    # GET request
    res = session.get(url, cookies=cookies, allow_redirects=False)
    # for javascript driven website
    # res.html.render()
    soup = BeautifulSoup(res.html.html, "html.parser")
    return soup.find_all("form")

def get_form_details(form):
    """Returns the HTML details of a form,
    including action, method and list of form controls (inputs, etc)"""
    details = {}
    # get the form action (requested URL)
    action = form.attrs.get("action", "").lower()
    # get the form method (POST, GET, DELETE, etc)
    # if not specified, GET is the default in HTML
    method = form.attrs.get("method", "get").lower()

    # get all form inputs
    inputs = []
    for input_tag in form.find_all("input"):
        # get type of input form control
        input_type = input_tag.attrs.get("type", "text").lower()
        # get name attribute
        input_name = input_tag.attrs.get("name")
        # get the default value of that input tag
        input_value =input_tag.attrs.get("value", "")
        # add everything to that list
        inputs.append({"type": input_type, "name": input_name, "value": input_value})

    for select in form.find_all("select"):
        # get the name attribute
        select_name = select.attrs.get("name")
        # set the type as select
        select_type = "select"
        select_options = []
        # the default select value
        select_default_value = ""
        # iterate over options and get the value of each
        for select_option in select.find_all("option"):
            # get the option value used to submit the form
            option_value = select_option.attrs.get("value")
            if option_value:
                select_options.append(option_value)
                if select_option.attrs.get("selected"):
                    # if 'selected' attribute is set, set this option as default    
                    select_default_value = option_value
        if not select_default_value and select_options:
            # if the default is not set, and there are options, take the first option as default
            select_default_value = select_options[0]
        # add the select to the inputs list
        inputs.append({"type": select_type, "name": select_name, "values": select_options, "value": select_default_value})
    for textarea in form.find_all("textarea"):
        # get the name attribute
        textarea_name = textarea.attrs.get("name")
        # set the type as textarea
        textarea_type = "textarea"
        # get the textarea value
        textarea_value = textarea.attrs.get("value", "")
        # add the textarea to the inputs list
        inputs.append({"type": textarea_type, "name": textarea_name, "value": textarea_value})

        # put everything to the resulting dictionary
    # submit button value + name
    submit_tag = form.find(attrs={"type": "submit"})
    details["submit"] = {"name" : submit_tag.attrs.get("name"), "value" : submit_tag.attrs.get("value")}
    details["action"] = action
    details["method"] = method
    details["inputs"] = inputs
    
    return details
   
        
def main(url, cookies=None) :
    # get all form tags
    try : 
        forms = get_all_forms(url, cookies=cookies)
        # iteratte over forms
        list_forms = []
        for i, form in enumerate(forms, start=1):
            form_details = get_form_details(form)
            list_forms.append(form_details)
        return list_forms
    except Exception as e:
        print(e)
        return []
    

    