class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    first = Content.first
    @notebook_struct = first.blank? ? "{}" : first.struct
    puts "**************************"
    puts @notebook_struct
  end

end
