port module Main exposing (..)

import Html exposing (..)
import Html.Attributes as HA exposing (..)
import Html.Events exposing (..)


-- import Http exposing (..)


main : Program (Maybe String) Model Msg
main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    { username : String
    , password : String
    , token : String
    , message : String
    }


init : Maybe String -> ( Model, Cmd Msg )
init token =
    case token of
        Just token ->
            Model "" "" token "" ! []

        Nothing ->
            Model "" "" "" "" ! []


type alias Creds =
    { username : String, password : String }


type Msg
    = Login String
    | Request Creds


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Login details ->
            model ! []

        Request credentials ->
            model ! []


view : Model -> Html Msg
view model =
    div [] []


subscriptions : b -> Sub Msg
subscriptions =
    always Sub.none
