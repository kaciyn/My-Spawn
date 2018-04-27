﻿using UnityEngine;
using System.Collections;

public class MusicPlayer : MonoBehaviour {
	static MusicPlayer instance=null;
	public bool DestroyMusic=false;
	// Use this for initialization
	void Awake(){
		if (!DestroyMusic){
			Debug.Log("music awake " + GetInstanceID());
			if (instance!=null){
				Destroy (gameObject);
				Debug.Log("music SELF DESTRUCT AAAA "+GetInstanceID());
			}
			else {
				instance=this;
				GameObject.DontDestroyOnLoad(gameObject);}
		}
	}

	
	void Start () {
		Debug.Log("music start "+GetInstanceID());
			
		
	}
	

}
