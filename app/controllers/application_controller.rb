class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def index
    @someVal = "123";
  #   render component: 'App', props: { someVal: someVal }, tag: 'div', class: 'my'
  end
  
end
