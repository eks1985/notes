class ContentsController < ApplicationController

  def save_contents
    first = Content.first
    if first.blank?
      new_content = Content.create({"struct": params[:struct]})
    else
      first.update_attributes({"struct": params[:struct]})
    end
    render text: "ok"
  end

  def index
    first = Content.first
    render text: first.blank? ? "{}" : first.struct
  end

end
