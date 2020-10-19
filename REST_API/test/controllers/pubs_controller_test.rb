require 'test_helper'

class PubsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pub = pubs(:one)
  end

  test "should get index" do
    get pubs_url, as: :json
    assert_response :success
  end

  test "should create pub" do
    assert_difference('Pub.count') do
      post pubs_url, params: { pub: { number_of_tables: @pub.number_of_tables } }, as: :json
    end

    assert_response 201
  end

  test "should show pub" do
    get pub_url(@pub), as: :json
    assert_response :success
  end

  test "should update pub" do
    patch pub_url(@pub), params: { pub: { number_of_tables: @pub.number_of_tables } }, as: :json
    assert_response 200
  end

  test "should destroy pub" do
    assert_difference('Pub.count', -1) do
      delete pub_url(@pub), as: :json
    end

    assert_response 204
  end
end
