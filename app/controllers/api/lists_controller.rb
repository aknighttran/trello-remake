class Api::ListsController < ApplicationController
  before_action :set_board
  before_action :set_list, only: [:show, :update, :destroy]

  def index
    render json: @board.lists
  end

  def show
    render json: @list
  end

  def create
    @list = @board.lists.new(list_params)
    if @list.save
      render json: @list
    else
      render json: @list.errors
    end
  end

  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors
    end
  end

  def destroy
    @item.destroy
  end

  private
    def set_board
      @board = Board.find(params[:board_id])
    end

    def set_list
      @list = board.lists.find(params[:id])
    end

    def list_params
      params.require(:list).permit(:name)
    end

end
