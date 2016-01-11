class TopicsController < ApplicationController

  def index
    puts "*******************"
    puts params[:topics]
    topics_array_obj = []
    topics_str = params[:topics].empty? ? "[]" : params[:topics]
    topics = JSON.parse(topics_str)
    topics.each do |topic_id|
      topic = Topic.find(topic_id)
      topics_array_obj << {title: topic.title, content: topic.content, topicId: topic.id}
    end
    @topics_array = JSON.generate(topics_array_obj)
    @topics = Topic.all
    @branchName = params[:branchName] || "Topics"
    @notebookTitle = params[:notebookTitle]
    @categoryTitle = params[:categoryTitle]
    @notebooks_struct = Content.first.struct
    render 'topics'
  end

  def create
    new_topic = Topic.new
    new_topic.title = "New title"
    new_topic.save
    render json: new_topic
  end

  def update
    cur_topic = Topic.find(params[:id])
    cur_topic.update_attributes({title: params[:title], content: params[:content]})
    render text: "ok"
  end

  def show
    @topicId= params[:id]
    topic = Topic.find(params[:id])
    @title = topic.title
    @content = topic.content
    render 'topic'
  end

end
